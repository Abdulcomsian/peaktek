import React from "react";
import Input from "../../Input";
import InputContainer from "../../InputContainer";
import DatePicker from "../../DatePicker/Index";
const SignaturesForm = () => {
  return (
    <form className="w-full">
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="jhon Doe"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Printed Name:"
          placeholder="jhon Doe"
          type="text"
          className="sm:mr-4"
        />

        <DatePicker label="Select a Date" />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="jhon Doe"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Printed Name:"
          placeholder="jhon Doe"
          type="text"
          className="sm:mr-4"
        />

        <DatePicker label="Select a Date" />
      </InputContainer>
    </form>
  );
};

export default SignaturesForm;
