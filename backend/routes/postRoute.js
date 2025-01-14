import express from 'express';
import { createPost, getAllPost, getMyPost } from '../controllers/postController.js';
import isAuthenticated from '../authenticated/isAuthenticated.js';
import upload from '../middlewares/multer.js';


const router = express.Router()

router.route("/create").post(isAuthenticated, upload.single('image') ,createPost)
router.route("/getmypost/:id").get(isAuthenticated, getMyPost)
router.route("/getallpost").get(isAuthenticated, getAllPost)



export default router;