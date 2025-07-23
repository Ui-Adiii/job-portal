import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "@/store/user/userSlice";
import axios from "axios";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";

const NavbarCom = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(signOutStart());
      const response = await axios.get("/api/user/logout");
      if (response.data.success) {
        dispatch(signOutSuccess());
        toast.success(response.data.message);
        window.location.href = "/";
      } else {
        dispatch(signOutFailure(response.data.message));
        toast.error(error);
      }
    } catch (err) {
      dispatch(signOutFailure(err.message));
      toast.error(error);
    }
  };

  return (
    <Navbar fluid rounded className="bg-white shadow-md">
      
        <Link className="text-gray-600" to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-slate-700">
            Job Portal
          </span>
        </Link>
<NavigationMenu>
  <NavigationMenuList>
<NavigationMenuItem>
          <NavigationMenuTrigger className={'text-black text-center'}>Jobs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                {
                  currentUser?.role === "recruiter" && (
                    <NavigationMenuLink asChild>
                      <Link to="/dashboard?tab=post-job">Post Job</Link>
                    </NavigationMenuLink>
                  )
                }
                <NavigationMenuLink asChild>
                  <Link  href="#">See jobs</Link>
                </NavigationMenuLink>
                <NavigationMenuLink as="div" asChild>
                  <Link  href="#">Edit jobs</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
       
      {currentUser && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={currentUser?.profile?.profilePhoto}
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">
                {currentUser?.fullname?.firstname}{" "}
                {currentUser?.fullname?.lastname}
              </span>
              <span className="block truncate text-sm font-medium">
                {currentUser?.email}
              </span>
            </DropdownHeader>

            <DropdownItem>
              <NavbarLink href="/dashboard">DashBoard</NavbarLink>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
      )}
      <NavbarCollapse>
        {!currentUser && (
          <Link to="sign-up">
            <Button className={"bg-blue-600"}>Sign Up</Button>
          </Link>
        )}
        {!currentUser && (
          <Link to="sign-in">
            <Button className={"bg-green-600"}>Sign In</Button>
          </Link>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};
export default NavbarCom;
