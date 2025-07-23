import express from "express";
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import userAuth from "../middlewares/user.auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/add", upload.single('logo'),userAuth,  registerCompany);
router.get("/get",userAuth, getCompany);
router.get("/get/:id", userAuth,getCompanyById);
router.put("/update/:id",userAuth, updateCompany);

export default router;
