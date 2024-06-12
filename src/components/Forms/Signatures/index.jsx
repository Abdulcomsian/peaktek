import React from "react";
import { Input, InputContainer, CustomDatePicker } from "@components";
const SignaturesForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />

        <CustomDatePicker label="Select a Date" className="mb-4 md:mb-0" />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />

        <CustomDatePicker label="Select a Date" className="mb-4 md:mb-0" />
      </InputContainer>
    </div>
  );
};

export default SignaturesForm;
