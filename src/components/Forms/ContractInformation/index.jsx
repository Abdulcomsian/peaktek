import React from "react";
import { Input, InputContainer } from "@components";
import RadioBox from "@components/RadioBox";

const ContractInformationForm = ({ className }) => {
  const options = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];

  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Name:"
          placeholder="John Doe"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Phone:"
          placeholder="923081177825"
          type="number"
          applyMarginBottom={true}
          className="  mb-4 md:mb-0"
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Street:"
          placeholder="west Bridge"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="City:"
          placeholder="New York"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4 md:max-w-xs  mb-4 md:mb-0"
        />
        <Input
          label="State:"
          placeholder="NY"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4 md:max-w-40  mb-4 md:mb-0"
        />
        <Input
          label="Zip:"
          placeholder="45678"
          type="number"
          applyMarginBottom={true}
          className="md:max-w-40  mb-4 md:mb-0"
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between items-center  md:mb-4">
        <Input
          label="Company:"
          placeholder="eg. Google"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4 md:max-w-md  mb-4 md:mb-0"
        />

        <RadioBox
          label="W9 on File:"
          name="w9Radio"
          options={options}
          className="w-full md:mr-4   mb-4 md:mb-0"
          defaultValue={1}
        />
        <RadioBox
          label="Workers Comp Insurance on File:"
          name="workerCamp"
          options={options}
          className="w-full md:mr-4   mb-4 md:mb-0"
          defaultValue={1}
        />
        <RadioBox
          label="Commercial Liability on File:"
          name="workerLiability"
          options={options}
          className="w-full mb-4 md:mb-0"
          defaultValue={1}
        />
      </InputContainer>
    </div>
  );
};

export default ContractInformationForm;
