import express from 'express';
import {
  postJob,
  getAllJobs,
  getJobById,
  getrecruiterJobs,
} from "../controllers/job.controller.js";
import userAuth from "../middlewares/user.auth.middleware.js";


const router = express.Router();

router.post("/post", userAuth, postJob);
router.get("/get", userAuth, getAllJobs);
router.get("/get/:id", userAuth, getJobById);
router.get("/recruiterjobs", userAuth, getrecruiterJobs);


export default router;