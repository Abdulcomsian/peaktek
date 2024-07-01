import React from "react";
import { Input, InputContainer } from "@components";

const CustomerInformationForm = ({ className, register }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Name:"
          placeholder="John Doe"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="name"
          register={register}
        />
        <Input
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="email"
          register={register}
        />
        <Input
          label="Phone:"
          placeholder="923081177825"
          type="number"
          applyMarginBottom={true}
          className="  mb-4 md:mb-0"
          name="phone"
          register={register}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Street:"
          placeholder="west Bridge"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="street"
          register={register}
        />
        <Input
          label="City:"
          placeholder="New York"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4 md:max-w-xs  mb-4 md:mb-0"
          name="city"
          register={register}
        />
        <Input
          label="State:"
          placeholder="NY"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4 md:max-w-40  mb-4 md:mb-0"
          name="state"
          register={register}
        />
        <Input
          label="Zip:"
          placeholder="45678"
          type="number"
          applyMarginBottom={true}
          className="md:max-w-40  mb-4 md:mb-0"
          name="zip"
          register={register}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Insurance:"
          placeholder="eg. Health Insurance"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="insurance"
          register={register}
        />
        <Input
          label="Claim Number:"
          placeholder="23232323"
          type="number"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          name="claimNumber"
          register={register}
        />
        <Input
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          applyMarginBottom={true}
          className="  mb-4 md:mb-0"
          name="policyNumber"
          register={register}
        />
      </InputContainer>
    </div>
  );
};

export default CustomerInformationForm;
