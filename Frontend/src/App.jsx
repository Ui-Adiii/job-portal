import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/customs/ScrollToTop";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import PrivateRoute from "./components/customs/PrivateRoute";
import OnlyRecruiter from "./components/customs/OnlyRecruiter";
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdateProfile from "./components/auth/UpdateProfile";
import DashBoard from "./components/dashboard/DashBoard";
import PostJob from "./pages/jobs/PostJob";
import AddCompany from "./pages/companies/AddCompany";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/change-password" element={<ForgotPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/dashboard" element={<DashBoard />} />

        </Route>
        <Route element={<OnlyRecruiter/>}>
          <Route path="post-job" element={<PostJob/>} />
          <Route path="add-company" element={<AddCompany/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
