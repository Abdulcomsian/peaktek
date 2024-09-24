import React from "react";
import { InputContainer } from "@components";
import {
  CustomDatePicker,
  DateSelector,
  TimeInput,
  Input,
} from "@components/FormControls";
import { Button } from "@components/UI";

const BuildScheduledForm = ({ register, control }) => {
  return (
    <div className="w-full">
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker
          label="Build Date"
          className="md:mr-4 mb-4 md:mb-0"
          name="buildDate"
          register={register}
          control={control}
        />

        <TimeInput
          label="Build Time"
          placeholder="7:00 AM"
          name="build_time"
          register={register}
          control={control}
          className="md:mr-4 mb-4 md:mb-0"
        />
      </InputContainer>

      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Home Owner"
          placeholder="Alex"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="homeOwner"
          register={register}
          control={control}
        />
        <Input
          label="Homeowner Email"
          placeholder="example@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          name="homeOwnerEmail"
          register={register}
          control={control}
        />
      </InputContainer>

      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Contractor"
          placeholder="JL Construction LLC"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="contractor"
          register={register}
          control={control}
        />
        <Input
          label="Contractor Email"
          placeholder="example@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          name="contractorEmail"
          register={register}
          control={control}
        />
      </InputContainer>

      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Supplier"
          placeholder="Home Depot"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="supplier"
          register={register}
          control={control}
        />
        <Input
          label="Supplier Email"
          placeholder="example@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          name="supplierEmail"
          register={register}
          control={control}
        />
      </InputContainer>
    </div>
  );
};

export default BuildScheduledForm;
