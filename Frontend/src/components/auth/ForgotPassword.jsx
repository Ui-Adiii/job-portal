import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {changePassWordSuccess} from '../../store/user/userSlice';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const ForgotPassword = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showingData, setshowingData] = useState("");
  
  useEffect(() => {
    if(password && confirmPassword) {
      if (password === confirmPassword) {
        setshowingData("Passwords match");
      } else {
        setshowingData("Passwords do not match");
      }
    }
  }, [password,confirmPassword ])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setshowingData("Passwords do not match");
      return;
    }
    setshowingData("Passwords match");
    const updatedUser = {
      ...currentUser,
      password: password,
    };
    dispatch(changePassWordSuccess(updatedUser));
    setpassword("");
    setconfirmPassword("");
    setshowingData("Password changed successfully");
  }

  return (
    <form
    onSubmit={handleSubmit} 
    className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Change Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div  >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}

                  placeholder="********"
                  id="confirm-password"
                  type="password"
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
           type="submit" className="w-full">
            Change Password
          </Button>
          
         {
          showingData && (
            <div>
              <p className={`px-3 py-2 border-2 rounded-md w-full  text-center text-md  ${showingData.includes('not match')? 'text-red-500 hover:text-red-700':'text-blue-500 hover:text-blue-700'} `}>{showingData}</p>
            </div>
          )
         }
        </CardFooter>
      </Card>
    </form>
  );
};

export default ForgotPassword;
