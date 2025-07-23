import React, { useEffect, useState } from "react";
import DashSidebar from "./DashSidebar";
import { useLocation } from "react-router-dom";
import UpdateProfile from "../auth/UpdateProfile";
import PostJob from "../../pages/jobs/PostJob";
import AddCompany from "@/pages/companies/AddCompany";
const DashBoard = () => {
  const location = useLocation();
  const [tab, settab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      settab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
   <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-56">
        <DashSidebar />
      </div>
      
      {tab === "update-profile" && <UpdateProfile />}
      {tab === "post-job" && <PostJob />}
      {tab === "add-company" && <AddCompany />}
      {/* Add more components based on the tab */}

    </div>
    </>
  );
};

export default DashBoard;
