import React from "react";
import Button from "@components/Button";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { Form, Input } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from "@components/Authentication/Navbar";
const Register = ({ onNext }) => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Login" />
      <div className="max-w-md mx-auto mt-10">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl text-gray-700 text-center mb-4">
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

            <Button
              className="flex justify-center w-full items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-3 py-2 mr-3 group"
              onClick={onNext}
            >
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

export default Register;
