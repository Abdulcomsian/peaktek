import React from "react";
import Input from "@components/Input";
import InputContainer from "@components/InputContainer";
import CustomDatePicker from "@components/DatePicker";
const DeliveryInformationForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <CustomDatePicker label="Select Date" />
        <Input
          label="Square Count:"
          placeholder="24"
          type="number"
          className="sm:mr-4"
        />
        <Input
          label="Total Perimeter LF:"
          placeholder="245"
          type="number"
          className="sm:mr-4"
        />
        <Input label="Ridge LF:" placeholder="245" type="number" />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <CustomDatePicker label="Build Date:" />
        <Input
          label="Valley SF:"
          placeholder="245"
          type="number"
          className="sm:mr-4"
        />
        <Input
          label="Hip and Ridge LF:"
          placeholder="235"
          type="number"
          className="sm:mr-4"
        />
        <Input label="Drip Edge LF:" placeholder="245" type="number" />
      </InputContainer>
    </div>
  );
};

export default DeliveryInformationForm;
