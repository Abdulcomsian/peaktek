import React from "react";
import { Input, InputContainer, CustomDatePicker } from "@components";
const SignaturesForm = ({
  className,
  register,
  control,
  defaultValue,
  disabled,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Company Signature:"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="company_signature"
          register={register}
          defaultValue={defaultValue?.company_signature || ""}
          disabled={disabled}
        />
        <Input
          label="Printed Name:"
          disabled={disabled}
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="company_printed_name"
          register={register}
          defaultValue={defaultValue?.company_printed_name || ""}
        />

        <CustomDatePicker
          control={control}
          name="company_date"
          label="Select a Date"
          className="mb-4 md:mb-0"
          defaultValue={defaultValue?.company_date}
          disabled={disabled}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          disabled={disabled}
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="customer_signature"
          register={register}
          defaultValue={defaultValue?.customer_signature}
        />
        <Input
          disabled={disabled}
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="customer_printed_name"
          register={register}
          defaultValue={defaultValue?.customer_printed_name}
        />

        <CustomDatePicker
          disabled={disabled}
          control={control}
          name="customer_date"
          label="Select a Date"
          className="mb-4 md:mb-0"
          defaultValue={defaultValue?.customer_date}
        />
      </InputContainer>
    </div>
  );
};

export default SignaturesForm;
