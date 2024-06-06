import React from "react";
import Input from "../../Input";
import InputContainer from "../../InputContainer";

const CustomerInformationForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col sm:flex-row justify-between ">
        <Input
          label="Name:"
          placeholder="John Doe"
          type="text"
          className="sm:mr-4  mb-4 sm:mb-0"
        />
        <Input
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          className="sm:mr-4  mb-4 sm:mb-0"
        />
        <Input
          label="Phone:"
          placeholder="923081177825"
          type="number"
          className="  mb-4 sm:mb-0"
        />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between ">
        <Input
          label="Street:"
          placeholder="west Bridge"
          type="text"
          className="sm:mr-4  mb-4 sm:mb-0"
        />
        <Input
          label="City:"
          placeholder="New York"
          type="text"
          className="sm:mr-4 sm:max-w-xs  mb-4 sm:mb-0"
        />
        <Input
          label="State:"
          placeholder="NY"
          type="text"
          className="sm:mr-4 sm:max-w-40  mb-4 sm:mb-0"
        />
        <Input
          label="Zip:"
          placeholder="45678"
          type="number"
          className="sm:max-w-40  mb-4 sm:mb-0"
        />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between">
        <Input
          label="Insurance:"
          placeholder="eg. Health Insurance"
          type="text"
          className="sm:mr-4  mb-4 sm:mb-0"
        />
        <Input
          label="Claim Number:"
          placeholder="23232323"
          type="number"
          className="sm:mr-4  mb-4 sm:mb-0"
        />
        <Input
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          className="  mb-4 sm:mb-0"
        />
      </InputContainer>
    </div>
  );
};

export default CustomerInformationForm;
