import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: '../.env'
})

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("coneected mongoDB");
    }).catch((error) => {
        console.log("error in mongodb.js", error);
    })

}

export default connectDB;