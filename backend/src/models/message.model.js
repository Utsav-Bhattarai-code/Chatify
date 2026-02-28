import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    reciverId : {
        type : mongoose.Schma.Types.ObjectId,
        ref : "User",
        required : true
    },
    image : {
        type : String
    },
    text : {
        type : String
    }
})

const Message = mongoose.model("Message" , messageSchema);

export default Message;
