import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { toggleTheme } from "@/store/theme/themeSlice";
import { Loader2Icon } from "lucide-react";

const SignIn = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData((prev) => ({ ...prev, [e.target.type]: e.target.value }));
  };

  const handleRoleChange = (value) => {
    setformData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role || !formData.role === "") {
      dispatch(signInFailure("Please select a role"));
      toast.error("Please select a role");
      return;
    }

    dispatch(signInStart());
    try {
      const response = await axios.post("/api/user/login", formData);

      if (response.data.success) {
        dispatch(signInSuccess(response.data.user));
        navigate("/");
        toast.success("Login successful");
      } else {
        dispatch(signInFailure(response.data.message));
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex justify-center items-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <Card className="w-full  max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/sign-up">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
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
                  <Link
                    to={"/change-password"}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  onChange={handleChange}
                  value={formData.password}
                  id="password"
                  type="password"
                  required
                />

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
          <Button type="submit" className={`w-full`} disabled={loading}>
            {loading ? (
              <Loader2Icon className="animate-spin inline mr-1" />
            ) : (
              ""
            )}
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignIn;
