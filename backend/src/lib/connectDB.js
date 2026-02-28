import mongoose from "mongoose";
import { ENV } from "./ENV.js";

// building a function to connect to mongoDb
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL);
        console.log("MongoDB connected successfully at :",conn.connection.host);
    } catch (error) {
        console.log("Error occured in the connectDB controller :",error.message);
        process.exit(1); // to exit the func with faliure code
    }
};
