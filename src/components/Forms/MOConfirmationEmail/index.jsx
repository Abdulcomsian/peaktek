import React from "react";
import { InputContainer } from "@components";
import { Input, DateSelector } from "@components/FormControls";
import { Button } from "@components/UI";

const MOConfimationForm = () => {
  return (
    <div>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Homeowner Name:"
          placeholder="John Doe"
          className="md:mr-4 mb-4 md:mb-0"
          name="name"
        />
        <Input
          label="Homeowner Email:"
          placeholder="john@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          name="email"
        />
        <Input
          label="Phone:"
          placeholder="923081177825"
          type="number"
          className="mb-4 md:mb-0"
          name="phone"
        />
      </InputContainer>
    </div>
  );
};

export default MOConfimationForm;
