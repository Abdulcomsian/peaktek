import React, { useState } from "react";
import Navbar from "@components/Authentication/Navbar";
import { Form } from "antd";
import { Button } from "@components";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Flex, Input, Typography } from "antd";
const { Title } = Typography;

const VerifyEmail = ({ currentStep, onNext }) => {
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const { email } = location.state || "";

  const onChange = (text) => {
    console.log("onChange:", text);
    const varifyOTP = async function () {
      const myHeaders = new Headers();

      const formdata = new FormData();
      formdata.append("otp", text);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const resp = await fetch(
        "https://test7.accrualdev.com/api/verify/otp",
        requestOptions
      );
      const data = await resp.json();
      if (data.status >= 200 && data.status < 300) {
        setIsVerified((is) => !is);
      }
      console.log("data", data);
    };

    if (text) varifyOTP();
  };
  const sharedProps = {
    onChange,
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Login" />
      <div className="flex items-center justify-center ">
        <div className="max-w-md mx-auto my-2 p-4 ">
          <h1 className="text-3xl font-semibold text-gray-700 mb-3">
            Please verify your email
          </h1>
          <p className="text-gray-700 text-sm">
            You're almost there! We've sent a verification code to your email:
          </p>
          <p className="mb-3 text-black font-medium">{email}</p>
          <p className="mb-3 text-sm">
            Simply click on the link within the email, or enter the code below
            to verify your email. If you don't see it, we recommend checking
            <span className="pl-1 text-black font-medium">
              your spam folder
            </span>
            .
          </p>

          <div className="flex items-end justify-between mt-4">
            <form>
              <Title level={4}>Enter 6-digit code</Title>
              <Input.OTP length={4} {...sharedProps} />
            </form>
            {/* <Button variant="gradient" onClick={onNext} className="">
              Verify Email
              <FaArrowRightLong className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button> */}
            <div>
              <p className="text-center text-sm">Can't find the code?</p>
              <Button className="w-full flex justify-center  items-center  text-blue-600 font-medium text-base   group">
                <MdOutlineMailOutline className="mr-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                Send New Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
