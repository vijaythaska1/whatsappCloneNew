import jwt from "jsonwebtoken";
import validation from "../utils/validation.js";
import userModel from "../models/userModel.js";
const session = {};
const handleError = (io, socket, err) => {
    console.log("err =============>", err);
    const socketId = socket.id;
    if (err) {
        if (typeof err === "string") {
            if (err === "Unauthorization") {
                err = "error_message:Unauthorized invailed authorization token";
            }
        }
        else if (typeof err === "object" && err instanceof Error) {
            err = err.message;
        }
        else
            err = "Connection refused";
    }
    else
        err = "Connection refused";
    io.to(socketId).emit("handleError", { message: err });
};
export default {
    authConnection: async (io, socket, next) => {
        try {
            const sendError = (message) => {
                if (!message)
                    message = "Unauthorized";
                throw new Error(message);
            };
            if (!socket.handshake || !socket.handshake.headers || !socket.handshake.headers.authorization)
                sendError();
            const authToken = socket.handshake.headers.authorization;
            const jwtSecretToken = process.env.SECRET_KEY;
            const decoded = jwt.verify(authToken, jwtSecretToken);
            const currentUser = await userModel.findOne({ _id: decoded?._id });
            if (!currentUser)
                sendError();
            // if (currentUser.isOnline === 1) sendError();
            socket.userData = currentUser;
            next();
        }
        catch (error) {
            console.log('err ===============>', error);
            next(error instanceof Error ? error : new Error(String(error)));
        }
    },
    handdleDuplicateConnection: validation.asyncHandler(async (io, socket) => {
        const _id = socket?.userData?.id;
        if (session[_id]) {
            session[_id]?.disconnect(true);
            session[_id] = socket;
        }
        else {
            session[_id] = socket;
        }
    }),
    handdleUserConnect: async (io, socket) => {
        try {
            const socketId = socket.id;
            const _id = socket?.userData?.id;
            await userModel.updateOne({ _id }, { $set: { socketId, isOnline: 1 } });
            io.to(socketId).emit("connectListenerr", {
                message: "User connected succesfully",
            });
        }
        catch (error) {
            handleError(io, socket, error);
        }
    },
};
