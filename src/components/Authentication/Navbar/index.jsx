import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Button } from "@components";
const Navbar = ({ btnText }) => {
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };
  return (
    <div className="flex justify-between items-center px-4 py-3">
      <div
        className="flex items-center cursor-pointer "
        onClick={() => handleNavigation("/dashboard")}
      >
        <Logo className="w-10 h-10 mr-2" />
        <h1 className="font-bold text-2xl text-gray-800">PeakTek</h1>
      </div>
      <div>
        <Button className="text-blue-600 font-medium text-base  rounded-full px-3 py-2 mr-3">
          Contact us
        </Button>
        <Button
          className="text-blue-600 font-medium text-base bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-2 mr-3"
          onClick={() => handleNavigation("/register")}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
