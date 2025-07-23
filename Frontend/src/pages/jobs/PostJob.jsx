import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PostJob = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    position: "",
    experience: "",
    company: currentUser?.profile?.company || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        salary: Number(formData.salary),
        experience: Number(formData.experience),
        position: Number(formData.position),
        requirements: formData.requirements
          .split(",")
          .map((req) => req.trim())
          .filter(Boolean),
      };
      console.log(payload)
      const res = await axios.post("/api/job/post", payload);
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          jobType: "Full-time",
          position: "",
          experience: "",
          company: currentUser?.profile?.company || "",
        });
        navigate("/");
      } else {
        toast.error(res.data.message || "Job post failed");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center min-h-screen w-full"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Post a Job</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="requirements">Requirements (comma separated)</Label>
            <Input
              id="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              type="number"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="jobType">Job Type</Label>
            <select
              id="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md text-sm text-gray-700"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="position">Number of Positions</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={handleChange}
              type="number"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="experience">Required Experience (years)</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Post Job
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PostJob;
