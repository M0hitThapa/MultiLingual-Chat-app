
import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js"
dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(cookieParser())

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
console.log("Go To" + PORT + "port, It's Running There")
connectDB();
}) ;

