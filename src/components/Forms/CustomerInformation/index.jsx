import React from "react";
import Input from "../../Input";
import InputContainer from "../../InputContainer";

const CustomerInformationForm = () => {
  return (
    <form className="w-full">
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Name:"
          placeholder="jhon Doe"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Email:"
          placeholder="jhon@gmail.com"
          type="email"
          className="sm:mr-4"
        />
        <Input label="Phone:" placeholder="923081177825" type="number" />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Street:"
          placeholder="west Bridge"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="City:"
          placeholder="New York"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="State:"
          placeholder="NY"
          type="text"
          className="sm:mr-4"
        />
        <Input label="Zip:" placeholder="45678" type="number" />
      </InputContainer>
      <InputContainer className="flex flex-col sm:flex-row justify-between sm:mb-4">
        <Input
          label="Insurance:"
          placeholder="jhon Doe"
          type="text"
          className="sm:mr-4"
        />
        <Input
          label="Claim Number:"
          placeholder="23232323"
          type="number"
          className="sm:mr-4"
        />
        <Input
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          className="sm:mr-4"
        />
      </InputContainer>
    </form>
  );
};

export default CustomerInformationForm;