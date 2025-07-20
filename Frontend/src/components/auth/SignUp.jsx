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
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../store/user/userSlice";
const SignUp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value) => {
    setformData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e) => {
    dispatch(signInStart());
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/register", formData);

      console.log(response);
      if (response.data.success) {
        dispatch(signInSuccess(response.data.user));
        // navigate("/");
      } else {
        dispatch(signInFailure(response.data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    // navigate("/");
  };

  return (
    <form
      className="flex justify-center items-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <Card className="w-full  max-w-sm">
        <CardHeader>
          <CardTitle>Register for your account</CardTitle>
          <CardAction>
            <Link to="/sign-in">
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 ">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  onChange={handleChange}
                  value={formData.firstname}
                  id="firstname"
                  type="name"
                  placeholder="Aditya"
                  required
                />
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  onChange={handleChange}
                  value={formData.lastname}
                  id="lastname"
                  type="name"
                  placeholder="Mallick"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={handleChange}
                  value={formData.password}
                  id="password"
                  type="password"
                  placeholder="*******"
                  required
                />

                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="manager" id="r3" />
                    <Label htmlFor="r3">Manager</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="employee" id="r2" />
                    <Label htmlFor="r2">Employee</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Register
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUp;
