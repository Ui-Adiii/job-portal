import express from 'express'
import {
  register,
  login,
  logout,
  updateProfile,
  updatePassword,
} from "../controllers/user.controller.js";
import userAuth from '../middlewares/user.auth.middleware.js';
import upload from'../middlewares/multer.middleware.js'


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/profile/update", userAuth, upload.single('profilePhoto'),updateProfile);
router.put("/profile/password/:id", userAuth, updatePassword);

export default router;