import express from 'express';
import { editProfile, getAllUsers, getMyProfile, login, logout, signUp } from '../controllers/userController.js';
import isAuthenticated from '../authenticated/isAuthenticated.js';
import upload from '../middlewares/multer.js';

const router = express.Router()

router.route("/signup").post(signUp)
router.route("/login").post(login)
router.route("/logout").get(isAuthenticated, logout)
router.route("/profile/:id").get(isAuthenticated, getMyProfile)
router.route("/profile/:id/edit").post(isAuthenticated, upload.single('profilePicture') , editProfile)
router.route("/:id/users").get(isAuthenticated, getAllUsers)

export default router;