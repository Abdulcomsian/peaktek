import React, { useState } from "react";
import { Navbar } from "@components/Authentication";
import { Form, Input, Row, Col, Checkbox, Select } from "antd";
import { Button } from "@components";
import { FaArrowRightLong } from "react-icons/fa6";

const AboutSelf = ({ currentStep, onNext }) => {
  const [form] = Form.useForm();
  const [showPhoneAndCheckbox, setShowPhoneAndCheckbox] = useState(false);
  const [showSelectBox, setShowSelectBox] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [showTools, setShowTools] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const handleFieldsChange = () => {
    const firstName = form.getFieldValue("firstname");
    const lastName = form.getFieldValue("lastname");
    setShowPhoneAndCheckbox(firstName && lastName);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setShowSelectBox(!!phone);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const handleOptionToggle = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    setShowTools(updatedOptions.length > 0);
  };

  const handleToolToggle = (tool) => {
    setSelectedTools((prevSelectedTools) =>
      prevSelectedTools.includes(tool)
        ? prevSelectedTools.filter((t) => t !== tool)
        : [...prevSelectedTools, tool]
    );
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const rolesData = [
    {
      label: "Peaktek business owner",
      value: "Peaktek business owner",
    },
    {
      label: "Peaktek sales",
      value: "Peaktek sales",
    },

    {
      label: "Peaktek administrator",
      value: "Peaktek administrator",
    },
    {
      label: "Homeowner",
      value: "homeowner",
    },
  ];
  const fullText =
    "By checking this box, you confirm you want to hear from Roofr with information about products, services, or special offers that we think may be of interest to you, which may include our use of automated dialing technology to call or text you at the phone number(s) above, including your wireless number if provided. You understand that this consent is not a condition to your purchase or use of our services. Message and data rates may apply. Personal information collected pursuant to any call or text communications will be collected in accordance with our Terms of Service and Privacy Policy.";
  const truncatedText =
    "By checking this box, you confirm you want to hear from Roofr with information about products, services, or special offers that we think may be of interest to you...";
  const roles = rolesData?.map((role) => {
    return {
      label: role?.label,
      value: role?.value,
    };
  });

  const options = [
    "Measurements",
    "Quotes/Proposals",
    "Leads",
    "CRM",
    "Invoicing",
    "Financing",
    "Not sure yet",
  ];

  const tools = [
    "Measurements",
    "Quotes/Proposals",
    "Invoices",
    "Leads",
    "CRM",
  ];

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Login" />
      <div className="flex items-center justify-center ">
        <div className="max-w-md mx-auto my-2 p-4 ">
          <p className="text-gray-500 text-sm mb-3">Step {currentStep} of 5</p>
          <h1 className="text-3xl font-semibold text-gray-700 mb-3">
            Tell us about yourself
          </h1>
          <p className="text-gray-700 mb-4">
            We’ve seen a thing or two, and we want to make sure you get the most
            out of the platform.
          </p>

          <Form
            layout="vertical"
            className="mb-3"
            form={form}
            onFieldsChange={handleFieldsChange}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstname"
                  rules={[
                    { required: true, message: "This Field is required." },
                  ]}
                >
                  <Input placeholder="John" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastname"
                  rules={[
                    { required: true, message: "This Field is required." },
                  ]}
                >
                  <Input placeholder="Doe" size="large" />
                </Form.Item>
              </Col>
            </Row>

            {showPhoneAndCheckbox && (
              <>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    { required: true, message: "This Field is required." },
                  ]}
                >
                  <Input
                    placeholder="923081177825"
                    size="large"
                    onChange={handlePhoneChange}
                  />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("You must agree to continue."),
                    },
                  ]}
                >
                  <div className="flex items-start">
                    <Checkbox />
                    <span className="ml-2">
                      {isReadMore ? fullText : truncatedText}
                      <button
                        onClick={toggleReadMore}
                        className="text-blue-600 ml-2"
                      >
                        {isReadMore ? "(read less)" : "(read more)"}
                      </button>
                    </span>
                  </div>
                </Form.Item>
                {showSelectBox && (
                  <>
                    <Form.Item
                      label="What best describes your role?"
                      name="role"
                      rules={[
                        { required: true, message: "This Field is required." },
                      ]}
                    >
                      <Select
                        placeholder="Select your role"
                        onChange={handleRoleChange}
                        options={roles}
                      />
                    </Form.Item>
                    {selectedRole && (
                      <>
                        <label className="block text-gray-700 mb-2">
                          What will you use Roofr for? (Select all that apply)
                        </label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {options.map((option) => (
                            <div
                              key={option}
                              onClick={() => handleOptionToggle(option)}
                              className={`cursor-pointer px-4 py-2 border rounded-lg ${
                                selectedOptions.includes(option)
                                  ? " outline-none border-blue-500 bg-blue-100"
                                  : "border-gray-300"
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {showTools && (
                      <>
                        <label className="block text-gray-700 mb-2">
                          What tools have you used before? (Select all that
                          apply)
                        </label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tools.map((tool) => (
                            <div
                              key={tool}
                              onClick={() => handleToolToggle(tool)}
                              className={`cursor-pointer px-4 py-2 border rounded-lg ${
                                selectedTools.includes(tool)
                                  ? " border-blue-500 bg-blue-100"
                                  : "border-gray-300 border"
                              }`}
                            >
                              {tool}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            <Button
              className="w-full flex justify-center items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-5 py-2 group"
              onClick={onNext}
            >
              Continue
              <FaArrowRightLong className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AboutSelf;
