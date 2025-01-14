import express from 'express';
import dotenv from "dotenv";
import connectDB from "./database/mongoDb.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Use environment variable or fallback to localhost
    credentials: true, // Enable cookies and other credentials
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// Start Server
const PORT = process.env.PORT || 8000; // Fallback port
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
