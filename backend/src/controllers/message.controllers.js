import cloudinary from "../lib/cloudinary";
import Message from "../models/message.model";
import User from "../models/user.model"; // Needed for contacts

// Get all contacts (all users except yourself)
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await User.find({ _id: { $ne: req.user._id } })
                                   .select("-password");
        res.status(200).json({
            message: "Contacts retrieved successfully!",
            status: true,
            data: contacts
        });
    } catch (error) {
        console.log("Error occurred in getAllContacts controller:", error.message);
        res.status(500).json({
            message: "Internal server error!",
            status: false
        });
    }
};

// Get messages between logged-in user and a specific user
export const getMessages = async (req, res) => {
    try {
        const userId = req.params.id;

        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id }
            ]
        }).sort({ createdAt: 1 }); // Oldest first

        res.status(200).json({
            message: "Messages retrieved successfully!",
            status: true,
            data: messages
        });
    } catch (error) {
        console.log("Error occurred in getMessages controller:", error.message);
        res.status(500).json({
            message: "Internal server error!",
            status: false
        });
    }
};

// Send a message (text or image)
export const send = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const { text, image } = req.body;

        if (!text && !image) {
            return res.status(400).json({
                message: "Both text and image can't be empty!",
                status: false
            });
        }

        const updates = {};

        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image);
            updates.image = uploadedImage.secure_url;
        }

        if (text) {
            updates.text = text;
        }

        const message = await Message.create({
            sender: req.user._id,
            receiver: receiverId,
            ...updates
        });

        res.status(201).json({
            message: "Message successfully sent!",
            status: true,
            data: message
        });
    } catch (error) {
        console.log("Error occurred in send controller:", error.message);
        res.status(500).json({
            message: "Internal server error!",
            status: false
        });
    }
};

// Get all chat partners (users you have exchanged messages with)
export const getAllChatPartners = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find distinct partner IDs from messages
        const partners = await Message.aggregate([
            { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
            { $project: {
                partner: { $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"] }
            }},
            { $group: { _id: "$partner" } }
        ]);

        // Fetch partner details
        const users = await User.find({ _id: { $in: partners.map(p => p._id) } })
                                .select("username profilePic");

        res.status(200).json({
            message: "Chat partners retrieved successfully!",
            status: true,
            data: users
        });
    } catch (error) {
        console.log("Error occurred in getAllChatPartners controller:", error.message);
        res.status(500).json({
            message: "Internal server error!",
            status: false
        });
    }
};
