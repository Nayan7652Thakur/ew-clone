import { User } from "../model/userModel.js";
import getDataUri from "../utils/dataUri.js";
import { Post } from "../model/postModel.js";
import cloudinary from "../utils/cloudinary.js";
import sharp from "sharp";


export const createPost = async (req, res) => {
    try {
        const { description } = req.body;
        const image = req.file;
        const userId = req.id;

        if (!image) return res.status(400).json({ message: 'Image required' });

        // image upload 
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            description,
            image: cloudResponse.secure_url,
            user: userId
        });
        const user = await User.findById(userId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'user', select: '-password' });

        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}



export const getMyPost = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate id
        if (!id) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }

        // Fetch posts for the logged-in user with populated user details
        const loggedInUserPost = await Post.find({ user: id }).populate('user', 'username profilePicture name');

        return res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            posts: loggedInUserPost,
        });
    } catch (error) {
        console.error("Error in getMyPost:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};




export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('user', '-password') // Populate user details, excluding the password
            .sort({ createdAt: -1 }); // Sort posts by creation date (most recent first)

        if (!posts.length) {
            return res.status(400).json({
                message: "No posts available",
                success: false
            });
        }

        return res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            posts
        });

    } catch (error) {
        console.error("Error in getAllPost:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};
