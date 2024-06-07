import React from "react";

import Button from "../../Button";
import { Form, Input, Checkbox } from "antd";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Navbar from "../Navbar";
const CreatePassword = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Login" />
      <div className="flex items-center justify-center my-10">
        <div className="max-w-md mx-auto my-2 p-4 ">
          <p className="text-gray-500 text-sm mb-3">Step 2 of 5</p>
          <h1 className="text-3xl font-semibold text-gray-700 mb-3">
            Create your password
          </h1>
          <p className="text-gray-500 mb-3">
            Passwords must contain at least 8 characters.
          </p>
          <Form layout="vertical" className="mb-3">
            <Form.Item
              label="Password"
              name="password"
              //   rules={[
              //     { required: true, message: "Please enter your password" },
              //   ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Checkbox className="mb-3 text-gray-400">
              I agree to Peaktek{" "}
              <span className="underline cursor-pointer text-gray-500">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </Checkbox>
            <div className="flex justify-between">
              <Button className="flex  items-center text-blue-600 font-medium text-base group">
                <FaArrowLeftLong className="mr-1 transform transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </Button>
              <Button className="flex justify-center  items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-5 py-2  group">
                Continue{" "}
                <FaArrowRightLong className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
