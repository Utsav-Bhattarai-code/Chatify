import { ENV } from "../lib/ENV.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req , res , next) => {
    try {
        const cookie = req.cookies.jwt;

         if (!cookie) return res.status(401).json({
            message : "Token not found!",
            status : false
         })

         const decodedId = jwt.decode(cookie , ENV.JWT_SECRET);

         if (!decodedId) return res.status(401).json({
            message : "Payload not found in cookie!",
            status : false
         })

         const user = await User.findById(decodedId);

         if (!user) return res.status(401).json({
            message : "Invaild cookie - user not found!",
            status : false,
         })

         req.user = user;

         next()
    } catch (error) {
        console.log("Error occured in the protect route middleware :",error.message);
    }
}
