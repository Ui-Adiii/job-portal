import express from "express";
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/compay.controller.js";
import userAuth from "../middlewares/user.auth.middleware.js";

const router = express.Router();

router.post("/register",userAuth,  registerCompany);
router.get("/get",userAuth, getCompany);
router.get("/get/:id", userAuth,getCompanyById);
router.put("/update/:id",userAuth, updateCompany);

export default router;
