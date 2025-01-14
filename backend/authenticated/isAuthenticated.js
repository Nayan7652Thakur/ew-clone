import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config({
    path:'.env'
})

const isAuthenticated = async (req,res,next) => {
    try { 
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message:"user not authenticated",
                success:false
            })
        }
        const decode= await jwt.verify(token, process.env.SECRET_TOKEN)
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        
    }
}

export default isAuthenticated;