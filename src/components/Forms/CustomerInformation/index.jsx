import React from "react";
import { Input, InputContainer } from "@components";

const CustomerInformationForm = ({
  className,
  register,
  defaultValue,
  disabled,
}) => {
  console.log("Default values fom customer inf", defaultValue);
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          disabled={true}
          label="Name:"
          placeholder="John Doe"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="name"
          id="name"
          ref={register}
          defaultValue={defaultValue?.name || ""}
        />
        <Input
          disabled={true}
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="email"
          ref={register}
          defaultValue={defaultValue?.email || ""}
        />
        <Input
          disabled={true}
          label="Phone:"
          placeholder="923081177825"
          type="number"
          applyMarginBottom={true}
          className="  mb-4 md:mb-0"
          name="phone"
          ref={register}
          defaultValue={defaultValue?.phone || ""}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          disabled={disabled}
          label="Street:"
          placeholder="west Bridge"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="street"
          register={register}
          defaultValue={defaultValue?.street || ""}
        />
        <Input
          disabled={disabled}
          label="City:"
          placeholder="New York"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4 md:max-w-xs  mb-4 md:mb-0"
          name="city"
          register={register}
          defaultValue={defaultValue?.city || ""}
        />
        <Input
          disabled={disabled}
          label="State:"
          placeholder="NY"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4 md:max-w-40  mb-4 md:mb-0"
          name="state"
          register={register}
          defaultValue={defaultValue?.state || ""}
        />
        <Input
          disabled={disabled}
          label="Zip:"
          placeholder="45678"
          type="number"
          applyMarginBottom={true}
          className="md:max-w-40  mb-4 md:mb-0"
          name="zip_code"
          register={register}
          defaultValue={defaultValue?.zip_code || ""}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          disabled={disabled}
          label="Insurance:"
          placeholder="eg. Health Insurance"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="insurance"
          register={register}
          defaultValue={defaultValue?.insurance || ""}
        />
        <Input
          disabled={disabled}
          label="Claim Number:"
          placeholder="23232323"
          type="number"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="claim_number"
          register={register}
          defaultValue={defaultValue?.claim_number || ""}
        />
        <Input
          disabled={disabled}
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          applyMarginBottom={true}
          className="  mb-4 md:mb-0"
          name="policy_number"
          register={register}
          defaultValue={defaultValue?.policy_number || ""}
        />
      </InputContainer>
    </div>
  );
};

export default CustomerInformationForm;
