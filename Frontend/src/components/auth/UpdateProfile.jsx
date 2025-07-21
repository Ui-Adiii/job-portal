import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
  const [formData, setformData] = useState({
    role: "recruiter",
    email: "",
    fullname:"",
    phoneNumber:"",
    password: "",
    profile:{
        bio:'',
        skills:[],
        resume:'',
        resumeOriginalName:'',
        company:'',
        profilePhoto:''
    }
  });

  const handleChange = (e) => {
    setformData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRoleChange = (value) => {
    setformData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
  
    e.preventDefault();
    console.log(formData);
    
  };

  return (
    <form
      className="flex justify-center items-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <Card className="w-full  max-w-lg">
        <CardHeader >
          <CardTitle>Update for your account</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  onChange={handleChange}
                  value={formData.fullname}
                  id="fullname"
                  type="name"
                  placeholder="Aditya Mallick"
                  required
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
                  required
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
                  required
                />
              </div>
              <div className="grid gap-2">
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="employee" id="r3" />
                    <Label htmlFor="r3">employee</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="recruiter" id="r2" />
                    <Label htmlFor="r2">recruiter</Label>
                  </div>
                </RadioGroup>
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
