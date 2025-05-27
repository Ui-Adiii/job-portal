import express from 'express'
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";
import userAuth from '../middlewares/user.auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.post("/profile/update", userAuth, updateProfile);

export default userRouter;