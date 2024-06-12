import React from "react";
import Navbar from "@components/Authentication/Navbar";
import { Form, Input } from "antd";
import { Button } from "@components";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
const VerifyEmail = ({ currentStep, onNext }) => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Login" />
      <div className="flex items-center justify-center ">
        <div className="max-w-md mx-auto my-2 p-4 ">
          <p className="text-gray-500 text-sm mb-3">Step {currentStep} of 5</p>
          <h1 className="text-3xl font-semibold text-gray-700 mb-3">
            Please verify your email
          </h1>
          <p className="text-gray-700">
            You're almost there! We've sent a verification code to your email:
          </p>
          <p className="mb-3 text-black font-medium">
            {/*place dynamic Email here */}
            aqibjaved5201@gmail.com
          </p>
          <p className="mb-3">
            Simply click on the link within the email, or enter the code below
            to verify your email. If you don't see it, we recommend checking
            <span className="pl-1 text-black font-medium">
              your spam folder
            </span>
            .
          </p>
          <Form layout="vertical" className="mb-3">
            <Form.Item
              label="Enter 6-digit code "
              name="password"
              rules={[{ required: true, message: "This Field is required." }]}
            >
              <Input placeholder="567890" size="large" />
            </Form.Item>

            <Button
              className="w-full flex justify-center  items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-5 py-2  group"
              onClick={onNext}
            >
              Verify Email
              <FaArrowRightLong className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Form>
          <p className="text-center mb-2">Can't find the code?</p>
          <Button className="w-full flex justify-center  items-center  text-blue-600 font-medium text-base   group">
            <MdOutlineMailOutline className="mr-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            Send New Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
