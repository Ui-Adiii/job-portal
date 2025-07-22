import Job from "../models/job.model.js";
import User from "../models/user.model.js";
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      company,
    } = req.body;

    const userId = req.id;
    const user = await User.findById(userId);
    if(!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }
    if(user.role !== "recruiter") {
      return res.json({
        message: "You are not authorized to post a job",
        success: false,
      });
    }
    if (
      !title ||
      !description ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !company
    ) {
      return res.json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company,
      createdBy: userId,
    });
    return res.json({
      message: "Job created successfully",
      success: true,
      job
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({
      path:"company"
    }).sort({createdAt: -1});

    if (!jobs) {
      return res.json({
        message: "Job not Found",
        success: false,
      });
    }

    return res.json({
      jobs,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.json({
        message: "Job not Found",
        success: false,
      });
    }

    return res.json({
      job,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const getrecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ createdBy: recruiterId });
    if (!jobs) {
      return res.json({
        message: "Job not Found",
        success: false,
      });
    }
    return res.json({
      jobs,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};


export { postJob, getAllJobs, getJobById, getrecruiterJobs };
