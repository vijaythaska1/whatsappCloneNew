import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from "./users.interface.js";
// interface IUser extends Document {
//   role: number;
//   name: string;
//   email: string;
//   age: number;
//   location: {
//     type: string;
//     coordinates: number[];
//   };
//   address: string;
//   password: string;
//   status: number;
//   countryCode: string;
//   phoneNumber: string;
//   otp: number;
//   verify: number;
//   bio: string;
//   isDeleted: number;
//   image: string;
//   authToken: string;
//   deviceToken: string;
//   deviceType: number;
//   notificationStatus: number;
//   socketId: string;
//   isOnline: number;
// }

// User Schema
const UserSchema: Schema<IUser> = new Schema({
  role: {
    type: Number,
    enum: [0, 1], // 0: Admin, 1: User
    default: 1,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [30, 'Name cannot exceed 30 characters'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [150, 'Age cannot exceed 150'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (coordinates: number[]) =>
          coordinates.length === 2 &&
          coordinates[0] >= -180 &&
          coordinates[0] <= 180 &&
          coordinates[1] >= -90 &&
          coordinates[1] <= 90,
        message: 'Invalid coordinates. Must be [longitude, latitude] within valid ranges.',
      },
      default: [0, 0],
    },
  },
  address: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  countryCode: {
    type: String,
    trim: true,
    default: '',
  },
  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: (v: string) => /^\d{10,15}$/.test(v),
      message: 'Phone number must be between 10 and 15 digits',
    },
  },
  otp: {
    type: Number,
    min: 1000,
    max: 9999,
  },
  verify: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [20, 'Bio cannot exceed 500 characters'],
  },
  isDeleted: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  image: {
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => !v || /^https?:\/\/.+/.test(v),
      message: 'Image URL must be a valid URL',
    },
  },
  authToken: {
    type: String,
    select: false, // Don't include auth token in query results by default
  },
  deviceToken: String,
  deviceType: {
    type: Number,
    enum: [0, 1], // 0: Android, 1: iOS
    default: 0,
  },
  notificationStatus: {
    type: Number,
    enum: [0, 1], // 0: Off, 1: On
    default: 1,
  },
  socketId: String,
  isOnline: {
    type: Number,
    enum: [0, 1],  //0: Off line, 1: On line
    default: 0,
  },
}, {
  timestamps: true
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phoneNumber: 1 }, { unique: true });
UserSchema.index({ location: '2dsphere' });

const UserModel = mongoose.model<IUser>('users', UserSchema);

export default UserModel;