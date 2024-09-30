import React from "react";
import { InputContainer, CustomDatePicker } from "@components";
import { DateSelector, Input, TextBox } from "@components/FormControls";

const AdjustorForm = ({ className, register, control }) => {
  return (
    <div className={className}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Adjustor"
          placeholder="John Doe"
          name="name"
          id="name"
          className="md:mr-4 mb-4 md:mb-0"
          register={register}
        />
        <Input
          label="Phone:"
          placeholder="000-000-0000"
          type="tel"
          name="phone"
          id="phone"
          className="md:mr-4 mb-4 md:mb-0"
          register={register}
        />
        <Input
          label="Adjustor Email:"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          id="email"
          className="md:mr-4 mb-4 md:mb-0"
          register={register}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker
          label="Date sent"
          className="w-full lg:max-w-[18.5rem]"
          control={control}
          name="date"
        />
      </InputContainer>
    </div>
  );
};

export default AdjustorForm;
