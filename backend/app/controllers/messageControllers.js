import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getRecieverSocketId } from "../lib/socket.js";


export const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.res._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error:"Internal server error" });
    }
};

export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;
        
        const messages = await Message.find({
            $or:[
                {senderId:myId, recieverId:userToChatId},
                {senderId:userToChatId, recieverId:myId}
            ]
        })

        res.status(200).json(messages)
    }   catch (error) {
console.log("Error in getMessage controller: ", error.message);
res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        })

        await newMessage.save();

        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage contoller: ",error.message);
    res.status(500).json({ message: "Internal server error" });
    }
};