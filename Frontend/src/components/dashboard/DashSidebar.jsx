import {
  Sidebar,
  SidebarItems,
  SidebarItem,
  SidebarItemGroup,
} from "flowbite-react";

import {
  HiUser,
  HiArrowSmRight,
 
} from "react-icons/hi";
import { LuCirclePlus } from "react-icons/lu";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOutStart ,signOutFailure,signOutSuccess} from "@/store/user/userSlice";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
   const {error,loading,currentUser}= useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
        const response = await axios.get('/api/user/logout');
        console.log(response.data);
        if (response.data.success) {
            dispatch(signOutSuccess());
            toast.success(response.data.message);
        } else {
            dispatch(signOutFailure(response.data.message));
            toast.error(error);
        }
    } catch (error) {
        dispatch(signOutFailure(error.message));
        toast.error(error);
    }

  };

  return (
    <Sidebar className="w-full md:w-56 ">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=update-profile"> 
            <SidebarItem icon={HiUser}  as="div">
              Dashboard
            </SidebarItem>
          </Link>
          <Link to="/dashboard?tab=post-job"> 
            <SidebarItem icon={LuCirclePlus}  as="div">
              Post Job
            </SidebarItem>
          </Link>
          <Link to="/dashboard?tab=add-company"> 
            <SidebarItem icon={LuCirclePlus}  as="div">
             Add Company
            </SidebarItem>
          </Link>
         

          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
