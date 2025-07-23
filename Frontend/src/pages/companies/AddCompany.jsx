import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "flowbite-react";
import { toast } from "react-toastify";

const AddCompany = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logo) return toast.error("Please upload a company logo");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("logo", logo);

    try {
      setLoading(true);
      const res = await axios.post("/api/company/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });

      setLoading(false);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Company creation failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center min-h-screen w-full"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Company</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Company Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} required />
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
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="logo">Company Logo</Label>
            <Input id="logo" type="file" accept="image/*" onChange={handleFileChange} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Add Company"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddCompany;
