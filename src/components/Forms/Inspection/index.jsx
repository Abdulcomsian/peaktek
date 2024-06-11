import React from "react";
import Input from "@components/Input";
import InputContainer from "@components/InputContainer";

const InspectionForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Company Representative:"
          placeholder="John Doe"
          type="text"
          className="sm:mr-4"
          applyMarginBottom={true}
        />
        <Input
          label="Commission %:"
          placeholder="80"
          type="number"
          applyMarginBottom={true}
          className="sm:max-w-xs"
        />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Company Representative:"
          placeholder="John Doe"
          type="text"
          applyMarginBottom={true}
          className="sm:mr-4"
        />
        <Input
          label="Commission %:"
          placeholder="80"
          type="number"
          applyMarginBottom={true}
          className="sm:max-w-xs"
        />
      </InputContainer>
    </div>
  );
};

export default InspectionForm;
