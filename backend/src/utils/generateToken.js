import jwt from "jsonwebtoken";
import { ENV } from "../lib/ENV.js";

// Cookie generation for saving users
export const generateToken = (userId , res) => {
    try {
        const token = jwt.sign({userId} , ENV.JWT_SECRET , {
            expiresIn : "7d"
        });

        cookieOptions = {
            maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly : true,
            sameSite : "strict",
            secure : ENV.NODE_ENV == "production"
        };

        res.cookie("jwt" , token , cookieOptions);
    } catch (error) {
        console.log("Error occured in the generateToken controller :".error.message);
    }
}
