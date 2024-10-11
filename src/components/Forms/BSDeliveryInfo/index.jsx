import React from "react";
import { InputContainer } from "@components";
// import { DateSelector, Form, TextBox } from "@components/FormControls";
// import {
//   CustomDatePicker,
//   DateSelector,
//   TextBox,
// } from "@components/FormControls";
import {
  CheckBox,
  CustomDatePicker,
  DateSelector,
  Input,
} from "@components/FormControls";
const BSDeliveryInformation = ({ className, register, control }) => {
  return (
    <div>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker
          label="Select a Date:"
          className="md:mr-4 mb-4 md:mb-0"
          name="build_date"
          control={control}
        />
        <Input
          label="Square Count:"
          placeholder="24"
          type="number"
          name="square_count"
          register={register}
          control={control}
        />
        <Input
          label="Total Perimeter:"
          placeholder="245"
          type="number"
          className="md:mr-4 mb-4 md:mb-0"
          name="total_perimeter"
          register={register}
          control={control}
        />
        {/* <Input
          label="Total Perimeter LF:"
          placeholder="245"
          type="number"
          className="md:mr-4 mb-4 md:mb-0"
          name="total_perimeter_lf"
          register={register}
          control={control}
        /> */}
        <Input
          label="Ridge LF:"
          placeholder="245"
          type="number"
          name="ridge_lf"
          register={register}
          control={control}
        />
      </InputContainer>

      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker
          label="Build Date:"
          className="md:mr-4 mb-4 md:mb-0"
          name="date_needed"
          register={register}
          control={control}
        />
        <Input
          label="Valley SF:"
          placeholder="245"
          type="number"
          className="md:mr-4 mb-4 md:mb-0"
          name="valley_sf"
          register={register}
          control={control}
        />
        <Input
          label="Hip and Ridge LF:"
          placeholder="235"
          type="number"
          className="md:mr-4 mb-4 md:mb-0"
          name="hip_and_ridge_lf"
          register={register}
          control={control}
        />
        <Input
          label="Drip Edge LF:"
          placeholder="245"
          type="number"
          className="mb-4 md:mb-0"
          name="drip_edge_lf"
          register={register}
          control={control}
        />
      </InputContainer>
    </div>
  );
};

export default BSDeliveryInformation;
