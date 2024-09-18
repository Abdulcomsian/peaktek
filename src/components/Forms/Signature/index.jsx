import React from "react";
import { InputContainer } from "@components";
import { CustomDatePicker, Input, TextBox } from "@components/FormControls";

const SignatureForm = ({ className, register, control }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Company Representative:"
          placeholder="john Doe"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="company_signature"
          id="company_signature"
          register={register}
          applyMarginBottom={true}
        />
        <Input
          label="Printed Name:"
          placeholder="john Doe"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="company_printed_name"
          id="company_printed_name"
          register={register}
          applyMarginBottom={true}
        />
        <CustomDatePicker
          name="company_date"
          id="company_date"
          control={control}
          label="Select a Date"
          className="mb-4 md:mb-0"
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Customer Signature:"
          placeholder="john Doe"
          className="md:mr-4 mb-4 md:mb-0"
          name="customer_signature"
          id="customer_signature"
          register={register}
          applyMarginBottom={true}
        />
        <Input
          label="Printed Name:"
          placeholder="john Doe"
          className="md:mr-4 mb-4 md:mb-0"
          name="customer_printed_name"
          id="customer_printed_name"
          register={register}
          applyMarginBottom={true}
        />
        <CustomDatePicker
          name="customer_date"
          id="customer_date"
          label="Select a Date"
          className="mb-4 md:mb-0"
          control={control}
        />
      </InputContainer>
    </div>
  );
};

export default SignatureForm;
