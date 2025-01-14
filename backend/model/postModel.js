import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // References the 'User' model
            required: true, // Ensures userId is always provided
        },
        description: {
            type: String,
            default: '' // Limits the description to 500 characters
        },
        image: {
            type: String, // URL or path to the uploaded image
            required: true
        },
        likes: [{
            type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the post
            ref: 'User'
        }],
        comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Post = mongoose.model("Post", PostSchema)
