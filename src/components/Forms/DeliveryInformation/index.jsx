import React from "react";
import { Input, InputContainer, CustomDatePicker } from "@components";

const DeliveryInformationForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker label="Date Needed:" className="md:mr-4" />
        <Input
          label="Square Count:"
          placeholder="24"
          type="number"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Total Perimeter LF:"
          placeholder="245"
          type="number"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Ridge LF:"
          placeholder="245"
          type="number"
          className="mb-4 md:mb-0"
          applyMarginBottom={true}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker label="Build Date:" className="md:mr-4" />
        <Input
          label="Valley SF:"
          placeholder="245"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          applyMarginBottom={true}
        />
        <Input
          label="Hip and Ridge LF:"
          placeholder="235"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          applyMarginBottom={true}
        />
        <Input
          label="Drip Edge LF:"
          placeholder="245"
          type="number"
          className="mb-4 md:mb-0"
          applyMarginBottom={true}
        />
      </InputContainer>
    </div>
  );
};

export default DeliveryInformationForm;
