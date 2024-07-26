import { InputContainer, Input } from "@components";
import { CustomDatePicker, CustomTimePicker } from "@components/FormControls";
import Button from "@components/JobDetails/ui/Button";
import React from "react";

const OverturnForm = ({ className }) => {
  return (
    <form className={className}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <CustomTimePicker label="Select a Time" className="mb-4 md:mb-0" />
        {/* <CustomDatePicker
          label="Select a Date"
       
        /> */}
      </InputContainer>
      <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
        Create
      </Button>
    </form>
  );
};

export default OverturnForm;
