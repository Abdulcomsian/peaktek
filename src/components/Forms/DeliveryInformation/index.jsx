import React from "react";
import Input from "../../Input";
import InputContainer from "../../InputContainer";
import CustomDatePicker from "../../DatePicker/Index";
const DeliveryInformationForm = () => {
  return (
    <form className="w-full">
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
    </form>
  );
};

export default DeliveryInformationForm;
