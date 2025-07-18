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


const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setformData] = useState({
    role: "employee",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData((prev) => ({ ...prev, [e.target.type]: e.target.value }));
  };

  const handleRoleChange = (value) => {
    setformData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/');
  };

  return (
    <form
      className="flex justify-center items-center min-h-[100vh]"
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
             
            <Button variant="link"  >Sign Up</Button>
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignIn;
