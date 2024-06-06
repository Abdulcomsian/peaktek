import React from "react";
import Input from "../../Input";
import InputContainer from "../../InputContainer";
import CustomDatePicker from "../../DatePicker/Index";
const SignaturesForm = ({ className }) => {
  return (
    <form className={`w-full ${className}`}>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4"
        />

        <CustomDatePicker label="Select a Date" />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          className="sm:mr-4"
        />

        <CustomDatePicker label="Select a Date" />
      </InputContainer>
    </form>
  );
};

export default SignaturesForm;
