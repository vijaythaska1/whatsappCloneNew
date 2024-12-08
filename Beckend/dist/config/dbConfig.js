import mongoose from 'mongoose';
import 'dotenv/config';
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGDB_URL);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
export default connectDB;
