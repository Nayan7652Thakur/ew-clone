import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/mongoDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import path from "path";

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Use environment variable or fallback
    credentials: true, // Enable cookies and other credentials
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// Serve Frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 8000; // Fallback port
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
