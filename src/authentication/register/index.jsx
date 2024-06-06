import React from "react";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { Form, Input } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/login");
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <Logo className="w-10 h-10 mr-2" />
          <h1 className="font-bold text-2xl text-gray-800 ">PeakTek</h1>
        </div>
        <div>
          <Button className="text-blue-600 font-medium text-base  rounded-full px-3 py-2 mr-3">
            Contact us
          </Button>
          <Button
            className="text-blue-600 font-medium text-base bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-2 mr-3"
            onClick={handleNavigation}
          >
            Login
          </Button>
        </div>
      </div>
      <div className="max-w-md mx-auto ">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-gray-800 text-center mb-4">
            Register to PeakTek
          </h1>
          <p className="mb-4">
            Get fast and accurate roof measurements and signature-worthy
            proposals.
          </p>

          <div className="flex items-center mb-4 text-sm font-medium text-gray-500">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2">Or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <Form layout="vertical" className="mb-4">
            <Form.Item
              label="Work email"
              name="email"
              rules={[{ message: "Please enter your email" }]}
            >
              <Input placeholder="name@company.com" type="email" size="large" />
            </Form.Item>

            <Button className="flex justify-center w-full items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-3 py-2 mr-3 group">
              Continue{" "}
              <FaArrowRightLong className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Form>
          <Button className="flex justify-center items-center text-gray-700 font-medium text-base  hover:bg-blue-50 border border-blue-200 rounded-full px-3 py-2 mr-3 mb-4">
            <FcGoogle className="w-5 h-5 mr-2" /> Register with Google
          </Button>
          <Button className="flex justify-center items-center text-gray-700 font-medium text-base  hover:bg-blue-50 border border-blue-200 rounded-full px-3 py-2 mr-2 mb-4">
            <MdFacebook className="w-6 h-6 mr-1 text-[#4267B2]" /> Register with
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
