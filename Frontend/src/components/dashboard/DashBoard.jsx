import React, { useEffect, useState } from "react";
import DashSidebar from "./DashSidebar";
import { useLocation } from "react-router-dom";
import UpdateProfile from "../auth/UpdateProfile";
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
      <div className="md:w-56">
        <DashSidebar />
      </div>
      
      {tab === "update-profile" && <UpdateProfile />}
     

    </div>
    </>
  );
};

export default DashBoard;
