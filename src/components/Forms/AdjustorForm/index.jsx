import { InputContainer, Input } from "@components";
import React from "react";

const AdjustorForm = () => {
  return (
    <div>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Name:"
          placeholder="John Doe"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Phone:"
          placeholder="923081177825"
          type="number"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          applyMarginBottom={true}
          className="  mb-4 md:mb-0"
        />
      </InputContainer>
    </div>
  );
};

export default AdjustorForm;
