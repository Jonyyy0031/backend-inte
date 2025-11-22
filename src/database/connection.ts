import mongoose from "mongoose";
import { env } from "../config/env";

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 5000});
        console.log("Connected to MongoDB successfully.");

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}