import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure username is unique
    },
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId], // Use ObjectId to refer to other users
      ref: 'User', // Optional: You can reference the User model itself if you need to populate followers
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId], // Use ObjectId to refer to other users
      ref: 'User', // Optional: You can reference the User model itself if you need to populate following
      default: [],
    },
    bookmarks: {
      type: [mongoose.Schema.Types.ObjectId], // Use ObjectId to reference items being bookmarked
      ref: 'Post', // Example: You could reference a "Post" model for bookmarked posts
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    posts:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }],
    profilePicture: {
      type:String,
      default: ''
    }
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

export const User = mongoose.model("User", UserSchema);
