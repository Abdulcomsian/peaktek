import React from "react";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Authentication/Navbar";
const Login = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/register");
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Register" />
      <div className="max-w-md mx-auto mt-6">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl text-gray-700 text-center mb-4">
            Log in to PeakTek
          </h1>
          <Button className="flex justify-center items-center text-gray-700 font-medium text-base  hover:bg-blue-50 border border-blue-200 rounded-full px-3 py-2 mr-3 mb-4">
            <FcGoogle className="w-5 h-5 mr-2" /> Login with Google
          </Button>
          <Button className="flex justify-center items-center text-gray-700 font-medium text-base  hover:bg-blue-50 border border-blue-200 rounded-full px-3 py-2 mr-2 mb-4">
            <MdFacebook className="w-6 h-6 mr-2 text-[#4267B2]" /> Login with
            Facebook
          </Button>
          <div className="flex items-center mb-4 text-sm font-medium text-gray-500">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4">Or, sign in with email</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <Form layout="vertical" className="mb-4">
            <Form.Item
              label="Email address"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Enter Email" type="email" size="large" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Button className="flex justify-center w-full items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base  hover:bg-custom-gradient border border-transparent rounded-full px-3 py-2 mr-3">
              Login
            </Button>
          </Form>
          <div className="flex justify-between">
            <Button className="text-gray-500 font-medium text-base">
              Forget password?
            </Button>
            <Button
              className="text-blue-600 font-medium text-base"
              onClick={handleNavigation}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
