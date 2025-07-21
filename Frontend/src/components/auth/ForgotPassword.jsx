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
import {
  changePassWordSuccess,
  changePassWordFailure,
  changePassWordStart,
} from "../../store/user/userSlice";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [pass, setpass] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showingData, setshowingData] = useState("");

  useEffect(() => {
    if (pass && confirmPassword) {
      if (pass === confirmPassword) {
        setshowingData("Passwords match");
      } else {
        setshowingData("Passwords do not match");
      }
    }
  }, [pass, confirmPassword]);

  const handleSubmit = async (e) => {
    dispatch(changePassWordStart());
    e.preventDefault();
    if (pass !== confirmPassword) {
      dispatch(changePassWordFailure("Passwords do not match"));
      setshowingData("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        `/api/user/profile/password/${currentUser._id}`,
        { confirmPassword }
      );
      if (response.data.success) {
        dispatch(changePassWordSuccess(confirmPassword));
        setshowingData("Password changed successfully");
        toast.success("Password changed successfully");
        navigator("/");
      } else {
        dispatch(changePassWordFailure(response.data.message));
        setshowingData(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(changePassWordFailure(error.message));
      setshowingData("Error changing password");
      toast.error(currentUser.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex items-center justify-center"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Change Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
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
            type="submit"
            className={`w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="animate-spin inline mr-1" />
            ) : (
              ""
            )}
            Forget Password
          </Button>

          {showingData && (
            <div>
              <p
                className={`px-3 py-2 border-2 rounded-md w-full  text-center text-md  ${
                  showingData.includes("not match")
                    ? "text-red-500 hover:text-red-700"
                    : "text-blue-500 hover:text-blue-700"
                } `}
              >
                {showingData}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default ForgotPassword;
