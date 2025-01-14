import { User } from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const signUp = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        if (!username || !email || !password || !name) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "This username is already taken. Try another one.",
                success: false,
            });
        }


        if (user) {
            return res.status(400).json({
                message: "This email already exists. Try another one.",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create the new user
        await User.create({
            username,
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User created successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Internal server error. Please try again later.",
            success: false,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, { expiresIn: "1d" });

        return res.status(200).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true
        });

    } catch (error) {
        console.error("UserController login error", error);
        return res.status(500).json({
            message: "Internal server error. Please try again later.",
            success: false
        });
    }
};


export const getMyProfile = async (req, res) => {
    try {
        const { id } = req.params;  // Corrected this line
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" }); // Added error handling response
    }
};

export const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "user logged out successfully.",
        success: true
    })
}


export const editProfile = async (req, res) => {
    try {
        
        const userId = req.id;
        const { username, name, description } = req.body;
        const profilePicture = req.file;
    
        let cloudResponse;
    
        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri)
        }
    
        const user = await User.findById(userId).select("-password")
    
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        if (username) user.username = username;
        if (name) user.name = name;
        if (name) user.description = description;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;
    
        await user.save()
    
        return res.status(200).json({
            message: "Profile updated",
            success: true,
            user
        })
    

    } catch (error) {
        console.log(error);
        
    }
}

export const getAllUsers = async (req,res) => {
    try {
        const user = req.id;
        const users = await User.find({_id: {$ne: user}})

        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        
    }

}