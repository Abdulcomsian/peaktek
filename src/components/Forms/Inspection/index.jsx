import React from "react";
import Input from "../../Input";
import InputContainer from "../../InputContainer";

const InspectionForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Company Representative:"
          placeholder="John Doe"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Commission %:"
          placeholder="80"
          type="number"
          className="sm:max-w-xs"
        />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Company Representative:"
          placeholder="John Doe"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Commission %:"
          placeholder="80"
          type="number"
          className="sm:max-w-xs"
        />
      </InputContainer>
    </div>
  );
};

export default InspectionForm;