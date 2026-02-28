import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { getPixelAvatar } from "../utils/getPixelAvatar.js";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req , res) => {
    const {fullName , email , password , confirmPassword} = req.body;
    try {
        if (!fullName || !email || !password || !confirmPassword) return res.status(400).json({
            message : "All fileds are required!",
            status : false
        })
        if (password !== confirmPassword) return res.status(400).json({
            message  : "Password and confirmPassword field doesn't match!",
            status : false
        })

        if (length(password) < 6) return res.status(400).json({
            message  : "Password length at least should be 6!",
            status : false
        })
        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.findOne({email});

        if (user) return res.status(400).json({
            message : "User already exists!",
            status : false
        });

        const profilePic = getPixelAvatar(fullName);

        const newUser = await User({email , fullName , profilePic , password : hashedPassword });

        newUser.save();

        generateToken(newUser._id , res);

        return res.status(201).json({
            message : "User signed in successfully!",
            status : true,
            data : {
                id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            }
        })

    } catch (error) {
        console.log("Error occured in the signup controller :" , error.message);
        res.status(500).json({
            message : "Internal server error!",
            status : false
        })
    }
}

export const login = async (req , res) => {
    const {email , password} = req.body;
    try {
        if (!email || !password) return res.status(400).json({
            message : "All fileds are required!",
            status : false
        });
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({
            message : "Invaild crediantials!",
            status : false
        });

        if (!await bcrypt.compare(password , user.password)) return res.status(400).json({
            message : "Invaild crediantials!",
            status : false
        });

        generateToken(user._id , res);

        return res.status(201).json({
            message : "User logged in successfully!",
            status : true,
        })

    } catch (error) {
        console.log("Error occured in the login controller :" , error.message);
        res.status(500).json({
            message : "Internal server error!",
            status : false
        })
    }
}

export const logout = (_,res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        message : "Logout was successful!",
        status : true
    })
}

export const updateProfile = async (req , res) => {
    const {profilePic , Bio , gender , DOB} = req.body;
    try {
        if (!profilePic && !Bio && !gender && !DOB) return res.status(400).json({
            message : "All fields can't be empty!",
            status : false
        })
        const updates = {};
        if (profilePic) {
            const uploader = await cloudinary.uploader.upload(profilePic);
            updates["profilePic"] = uploader.secure_url;
        }
        if (Bio) {
            updates["Bio"] = Bio;
        }
        if (gender) {
            updates["gender"] = gender;
        }
        if (DOB) {
            updates["DOB"] = DOB;
        }

        const userId = req.user._id;

        const user = await User.findByIdAndUpdate({_id : userId} , updates).select("-password");

        return res.status(200).json({
            message : "User deatils updated successfully!",
            status : true,
            data : {
                ...user
            }
        })

    } catch (error) {
        console.log("Error occured in the updateProfile controller :" , error.message);
        res.status(500).json({
            message : "Internal server error!",
            status : false
        })
    }
}
