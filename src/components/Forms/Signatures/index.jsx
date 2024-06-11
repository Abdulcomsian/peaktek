import React from "react";
import Input from "@components/Input";
import InputContainer from "@components/InputContainer";
import CustomDatePicker from "@components/DatePicker";
const SignaturesForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4  mb-4 sm:mb-0"
        />
        <Input
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4  mb-4 sm:mb-0"
        />

        <CustomDatePicker label="Select a Date" className="mb-4 sm:mb-0" />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4  mb-4 sm:mb-0"
        />
        <Input
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4  mb-4 sm:mb-0"
        />

        <CustomDatePicker label="Select a Date" className="mb-4 sm:mb-0" />
      </InputContainer>
    </div>
  );
};

export default SignaturesForm;
