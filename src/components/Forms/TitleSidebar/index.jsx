import React from "react";
import { Input, Button, InputContainer, CustomDatePicker } from "@components";
import { FaRegEdit } from "react-icons/fa";
const TitleSidebarForm = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-base uppercase">Page Content</h2>
        <Button className="px-4 py-2 bg-white rounded-md font-medium">
          View Page
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-4 cursor-pointer">
        <span className="font-semibold">Title</span>
        <FaRegEdit />
      </div>

      <div className="p-8 bg-white flex-grow shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  rounded-lg dark:border-gray-700">
        <Input
          label="Report Type:"
          placeholder="Enter report type"
          type="text"
          className="mb-4"
          applyMarginBottom={true}
        />
        <CustomDatePicker label="Date:" className="mb-4" />
        <Input
          label="Primary Image:"
          type="file"
          className=" mb-4"
          applyMarginBottom={true}
        />
        <Input
          label="Certification/Secondary Logo:"
          type="file"
          className="mb-4"
          applyMarginBottom={true}
        />
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <Input
            label="First Name:"
            placeholder="John"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
          />
          <Input
            label="Last Name:"
            placeholder="Doe"
            type="text"
            className="mb-4"
            applyMarginBottom={true}
          />
        </InputContainer>
        <Input
          label="Company Name:"
          placeholder="eg.Microsoft"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
        />
        <Input
          label="Address:"
          placeholder="350 5th Ave"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
        />
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <Input
            label="City:"
            placeholder="New York"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
          />
          <Input
            label="State/Province:"
            placeholder="NY"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
          />
          <Input
            label="Zip Code/Postal Code:"
            placeholder="10118"
            type="number"
            className="mb-4"
            applyMarginBottom={true}
          />
        </InputContainer>
      </div>
    </>
  );
};

export default TitleSidebarForm;
