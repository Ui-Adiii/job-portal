import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "flowbite-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import {
  updateSuccess,
  updateFailure,
  updateStart,
} from "@/store/user/userSlice";

const UpdateProfile = () => {
  const navigate = useNavigate();
  
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    firstname: currentUser?.fullname?.firstname || "",
    lastname: currentUser?.fullname?.lastname || "",
    phoneNumber: currentUser?.phoneNumber || "",
    email: currentUser?.email || "",
    bio: currentUser?.profile?.bio || "",
    skills: currentUser?.profile?.skills?.join(", ") || "",
    resume: currentUser?.profile?.resume || "",
    resumeOriginalName: currentUser?.profile?.resumeOriginalName||"",
    company: currentUser?.profile?.company || "",
    profilePhoto: currentUser?.profile?.profilePhoto || "",
  });
  const [profileImage, setprofileImage] = useState(
    currentUser?.profile?.profilePhoto || ""
  );


  const handleChange = (e) => {
    setformData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    dispatch(updateStart());
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
      if (key !== "profilePhoto" && key !== "profilePhotoOriginalName") {
        data.append(key, value);
      }
    });

    if (formData.profilePhoto) {
      data.append("profilePhoto", formData.profilePhoto);
      data.append("profilePhotoOriginalName", formData.profilePhotoOriginalName);
    }
      const response = await axios.put("/api/user/profile/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.success) {
        dispatch(updateSuccess(response.data.rest));
        toast.success(response.data.message);
        setformData({
          firstname: "",
          lastname: "",
          phoneNumber: "",
          email: "",
          bio: "",
          skills: "",
          resume: "",
          resumeOriginalName: "",
          company: "",
          profilePhoto: "",
        });
        setprofileImage("");
        navigate("/profile");
      } else {
        dispatch(updateFailure(response.data.message));
        toast.error(error);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(error);
      return;
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setformData((prev) => ({
        ...prev,
        profilePhoto: file,
        profilePhotoOriginalName: file.name,
      }));
      setprofileImage(image);
    }
  };
  return (
    <form
      className="flex justify-center items-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <Card className="w-full  max-w-sm">
        <CardHeader>
          <CardTitle>Update for your account</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  id="profilePhotoInput"
                  accept="image/*"
                  onChange={handleChangeImage} 
                  className="hidden"
                />

                <label htmlFor="profilePhotoInput" className="cursor-pointer">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mb-2"
                  />
                </label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="firstname">Full Name</Label>
                <Input
                  onChange={handleChange}
                  value={formData.firstname}
                  id="firstname"
                  type="name"
                  placeholder="Aditya"
                />
                <Label htmlFor="lastname">Full Name</Label>
                <Input
                  onChange={handleChange}
                  value={formData.lastname}
                  id="lastname"
                  type="name"
                  placeholder="Mallick"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  id="phoneNumber"
                  type="name"
                  placeholder="+91-0000000000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleChange}
                  value={formData.email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid w-full gap-1">
                <Label htmlFor="bio">Your message</Label>
                <Textarea
                  onChange={handleChange}
                  value={formData.bio}
                  placeholder="Type your message here."
                  id="bio"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="skill">Your Skill</Label>
                <Input
                  id="skills"
                  placeholder="Enter your skills, separated by commas"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Update
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UpdateProfile;
