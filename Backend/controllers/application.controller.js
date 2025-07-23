const acceptApplication = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // Check if current user (from req.id) is a recruiter
    const currentUser = await User.findById(req.id);
    if (!currentUser || currentUser.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can accept applications",
      });
    }

    // Find the user and job
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const application = job.applications.find(
      (app) => app.userId.toString() === userId
    );
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.status = "Accepted";
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Application accepted successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const rejectApplication = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // Check if current user (from req.id) is a recruiter
    const currentUser = await User.findById(req.id);
    if (!currentUser || currentUser.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can reject applications",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const application = job.applications.find(
      (app) => app.userId.toString() === userId
    );
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.status = "Rejected";
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Application rejected successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
