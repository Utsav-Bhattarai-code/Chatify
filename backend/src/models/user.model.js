import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";

// building user schema
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    fullName : {
        type : String,
        required : true,
        minlength : 6
    },
    profilePic : {
        type : String,
        default : ""
    },
    Bio : {
        type : String,
        default : ""
    },
    gender : {
        type : String,
        enum : ["Male","Female","Custon","Rather not to say"],
        default : "Rather not to say"
    },
    DOB : {
        type : Date,
    },

},{timestamps:true});

//todo : Build a welcome email sender

userSchema.post(async (doc,next) => {
    try {
        await mailSender(email)
    } catch (error) {
        console.log("Error occured in user model while sending email :",error.message);
    }
})

// user model establish
const User = mongoose.model("User",userSchema);

export default User
