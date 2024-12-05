import mongoose  from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB is connected my boy: ${conn.connection.host}`);
    } catch (error) {
console.log("OOps sorry, I go an error:" ,error)
    }
}