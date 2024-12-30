import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import jwt, { JwtPayload } from 'jsonwebtoken';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import UserModel from "../models/users/users.model.js";
// import serviceAccount from "../config/serviceAccountKey.json" assert { type: "json" };
import { ObjectSchema } from 'joi';

dotenv.config();

// Types
interface UploadedFile {
    name: string;
    mimetype: string;
    mv: (path: string) => Promise<void>;
}

interface FileUploadResult {
    success: boolean;
    fileUrl?: string;
    message?: string;
}

interface NotificationPayload {
    token: string;
    message: string;
    type: string;
    sendername: string;
    senderId: string;
    receiverId: string;
}

interface ApiResponse {
    success: boolean;
    code: number;
    message: string;
    body: any;
}


declare global {
    namespace Express {
        interface Request {
            user?: any;
            files?: {
                file: UploadedFile | UploadedFile[];
            };
            session?: {
                user?: any;
            };
        }
    }
}

// Initialize Firebase Admin
// try {
//     // const serviceAccount = require('../config/serviceAccountKey.json');
//     const serviceAccount = JSON.parse(fs.readFileSync("./src/config/serviceAccountKey.json", "utf-8"));
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount as any),
//     });
// } catch (error) {
//     console.error('Failed to initialize Firebase Admin:', error);
//     process.exit(1);
// }

// Constants
const SUPPORTED_MIME_TYPES: Record<string, string> = {
    'image/jpeg': 'images',
    'image/png': 'images',
    'application/pdf': 'pdf',
    'application/msword': 'docs',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docs',
    'audio/mpeg': 'audio',
    'video/mp4': 'video',
};

// Helper Functions
const getFileType = (mimeType: string): string | null =>
    SUPPORTED_MIME_TYPES[mimeType] || null;


type MessageInput = string | Error | { message: string } | null | undefined;
const extractMessage = (message: MessageInput): string => {
    if (!message) return '';
    if (typeof message === 'string') return message;
    if (message instanceof Error) return message.message;
    if (typeof message === 'object' && 'message' in message) return message.message;
    return '';
};

// Create response helper function
const createResponse = (
    success: boolean,
    message: MessageInput = '',
    body: any = {},
    code: number = 200
): ApiResponse => ({
    success,
    code,
    message: extractMessage(message),
    body,
});

const ensureDirectory = (dirPath: string): void => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

export default {
    uploadFile: async (req: Request, res: Response): Promise<Response> => {
        try {
            if (!req.files?.file) {
                return res.status(400).json(createResponse(false, 'No files uploaded'));
            }

            const files = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
            const uploadResults: FileUploadResult[] = await Promise.all(
                files.map(async (file: UploadedFile) => {
                    const fileType = getFileType(file.mimetype);
                    if (!fileType) {
                        return { success: false, message: `Unsupported file type: ${file.mimetype}` };
                    }

                    const uploadDir = path.join(process.cwd(), 'public', fileType);
                    ensureDirectory(uploadDir);

                    const fileName = `${uuidv4()}-${file.name}`;
                    const filePath = path.join(uploadDir, fileName);
                    const fileUrl = `${process.env.BASE_URL}/${fileType}/${fileName}`;

                    try {
                        await file.mv(filePath);
                        return { success: true, fileUrl };
                    } catch (error) {
                        return { success: false, message: `Failed to save file: ${file.name}` };
                    }
                })
            );

            const failedUploads = uploadResults.filter(result => !result.success);
            if (failedUploads.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Some files failed to upload',
                    failedUploads: failedUploads.map(upload => upload.message),
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Files uploaded successfully',
                uploadedFiles: uploadResults
                    .filter(result => result.success)
                    .map(result => result.fileUrl),
            });
        } catch (error) {
            console.error('Upload error:', error);
            return res.status(500).json(createResponse(false, 'Internal server error'));
        }
    },

    session: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (req.session?.user) {
            next();
        } else {
            res.redirect('/loginPage');
        }
    },

    catchServerError: async (err: Error & { statusCode?: number }, req: Request, res: Response): Promise<Response> => {
        console.error('Server error:', err);
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message: err.message || 'Internal server error',
        });
    },

    tryCatchHandler: (fn: Function) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            console.error('Handler error:', error);
            res.status(error.statusCode || 500).json(createResponse(
                false,
                error.message || 'Internal server error',
                {},
                error.statusCode || 500
            ));
        }
    },

    dataValidator: (schema: ObjectSchema, data: any): boolean => {
        const { error } = schema.validate(data, { abortEarly: true });
        if (error) {
            const message = error.details[0].message
                .split(' ')
                .map(word => word.replace(/^"|"$/g, ''))
                .join(' ')
                .trim();
            throw { message, statusCode: 400 };
        }
        return true;
    },

    success: async (res: Response, message: string = '', body: any = {}): Promise<Response> =>
        res.status(200).json(createResponse(true, message, body)),

    asyncHandler: (fn: Function) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            console.error('Async handler error:', error);
            res.status(500).json(createResponse(false, error?.message || 'Internal server error'));
        }
    },

    validateApiKeys: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { SECRET_KEY, PUBLISH_KEY } = process.env;

        if (!SECRET_KEY || !PUBLISH_KEY) {
            console.error('Missing required environment variables');
            res.status(500).json(createResponse(false, 'Server configuration error'));
        }

        if (req.headers['secret_key'] === SECRET_KEY && req.headers['publish_key'] === PUBLISH_KEY) {
            next();
        } else {
            res.status(401).json(createResponse(false, 'Invalid API keys'));
        }
    },

    authenticateToken: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
            if (!token) {
                return void res.status(401).json(createResponse(false, 'No token provided'));
            }
            if (!process.env.SECRET_KEY) {
                throw new Error('JWT secret key not configured');
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload & { _id: string };
            const user = await UserModel.findById(decoded._id);
            if (!user) {
                return void res.status(401).json(createResponse(false, 'Invalid token'));
            }
            req.user = user;
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(401).json(createResponse(false, 'Invalid token'));
        }
    },

    // sendPushNotification: async (payload: NotificationPayload): Promise<void> => {
    //     try {
    //         if (!payload.token) {
    //             throw new Error('Device token is required');
    //         }

    //         const message = {
    //             token: payload.token,
    //             notification: {
    //                 title: 'Clipa',
    //                 body: payload.message,
    //             },
    //             data: {
    //                 title: 'Clipa',
    //                 message: payload.message,
    //                 notificationType: payload.type,
    //                 sendername: payload.sendername,
    //                 senderId: payload.senderId,
    //                 receiverId: payload.receiverId,
    //             },
    //         };

    //         await admin.messaging().send(message);
    //     } catch (error) {
    //         console.error('Push notification error:', error);
    //         throw error;
    //     }
    // },
};
