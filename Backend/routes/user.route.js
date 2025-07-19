import express from 'express'
import {
  register,
  login,
  logout,
  updateProfile,
  updatePassword,
} from "../controllers/user.controller.js";
import userAuth from '../middlewares/user.auth.middleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/profile/update", userAuth, updateProfile);
router.post("/profile/password/:id", userAuth, updatePassword);

export default router;