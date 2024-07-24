import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Button } from "@components";
const Navbar = ({ btnText }) => {
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };
  return (
    <div className="flex justify-between items-center px-4 py-6">
      <div
        className="flex items-center cursor-pointer "
        onClick={() => handleNavigation("/dashboard")}
      >
        <Logo className="w-40 h-auto mr-2" varient="white" />
      </div>
      <div>
        {/* <Button className="text-blue-600 font-medium text-base  rounded-full px-3 py-2 mr-3">
          Contact us
        </Button> */}
        <Button
          className="text-blue-600 font-medium text-base bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-2 mr-3"
          to={`${btnText === "Register" ? "/register" : "/"}`}
        >
          {btnText === "Register" ? "Register" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
