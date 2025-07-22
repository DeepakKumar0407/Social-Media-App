import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";
import job from "./cron/cron.js";

dotenv.config();

connectDB();
job.start();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
	cloud_name: "dh2si3c4g",
	api_key: "134339882754649",
	api_secret:"5gPktWsFgM7fmRnvLFR9ch1kpTY",
});


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));


	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
