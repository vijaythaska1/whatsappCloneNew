import { Document } from 'mongoose';

export interface IUser extends Document {
  role: number;
  name: string;
  email: string;
  age: number;
  location: {
    type: string;
    coordinates: number[];
  };
  address: string;
  password: string;
  status: number;
  countryCode: string;
  phoneNumber: string;
  otp: number;
  verify: number;
  bio: string;
  isDeleted: number;
  image: string;
  authToken: string;
  deviceToken: string;
  deviceType: number;
  notificationStatus: number;
  socketId: string;
  isOnline: number;
}

