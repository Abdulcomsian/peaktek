import React, { useState } from "react";
import Navbar from "@components/Authentication/Navbar";
import { Form, Input } from "antd";
import Button from "@components/Button";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AboutCompany = ({ currentStep, onBack }) => {
  const navigate = useNavigate();
  const [showBusinessAddress, setShowBusinessAddress] = useState(false);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Residential retail",
    "Residential insurance",
    "Commercial retail",
    "Commercial insurance",
    "None apply",
  ];

  const handleCompanyNameChange = (value) => {
    setShowBusinessAddress(!!value);
  };

  const handleBusinessAddressChange = (value) => {
    setShowAdditionalOptions(!!value);
  };

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const handleNavigation = () => {
    navigate("/dashboard");
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Login" />
      <div className="flex items-center justify-center">
        <div className="max-w-md mx-auto my-2 p-4">
          <p className="text-gray-500 text-sm mb-3">Step {currentStep} of 5</p>
          <h1 className="text-2xl font-semibold text-gray-700 mb-3">
            Tell us about the company
          </h1>
          <p className="text-gray-700 mb-4">
            This gives Peaktek Success Team a headstart so they can provide the
            best support for your team.
          </p>

          <Form layout="vertical" className="mb-3">
            <Form.Item
              label="Company name"
              name="CompanyName"
              rules={[{ required: true, message: "This Field is required." }]}
              onChange={(e) => handleCompanyNameChange(e.target.value)}
            >
              <Input placeholder="dbqp" size="large" />
            </Form.Item>

            {showBusinessAddress && (
              <Form.Item
                label="Business Address"
                name="BusinessAddress"
                rules={[{ required: true, message: "This Field is required." }]}
                onChange={(e) => handleBusinessAddressChange(e.target.value)}
              >
                <Input placeholder="Enter business address" size="large" />
              </Form.Item>
            )}

            {showAdditionalOptions && (
              <>
                <label className="block text-gray-700 mb-2">
                  Which best describes the work you do? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {options.map((option, index) => (
                    <div
                      key={option}
                      onClick={() => handleOptionToggle(option)}
                      className={`cursor-pointer px-4 py-2 text-center border rounded-lg ${
                        selectedOptions.includes(option)
                          ? "bg-blue-200 outline-1 outline-blue-500"
                          : "border-gray-300"
                      } ${index === 4 ? "col-span-2" : ""}`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-between">
              <Button
                className="flex items-center text-blue-600 font-medium text-base group"
                onClick={onBack}
              >
                <FaArrowLeftLong className="mr-1 transform transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </Button>
              <Button
                className="flex justify-center items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-5 py-2 group"
                onClick={handleNavigation}
              >
                Create Account
                <FaArrowRightLong className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
