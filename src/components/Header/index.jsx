import React from "react";
import Button from "../Button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Header = ({ children }) => {
  const navigate = useNavigate();
  const BackToHome = () => {
    navigate("/");
  };
  return (
    <div className="bg-lightBlue py-6 flex justify-between px-4">
      <Button
        className="flex items-center text-blue-600 hover:text-blue-700 text-lg font-semibold"
        onClick={BackToHome}
      >
        <IoIosArrowBack /> <span className="ml-1 ">Back</span>
      </Button>
      <Button className="text-blue-600 hover:text-blue-700 text-lg font-semibold">
        Save
      </Button>
    </div>
  );
};

export default Header;
