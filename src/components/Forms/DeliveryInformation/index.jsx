import React from "react";
import { Input, InputContainer, CustomDatePicker } from "@components";

const DeliveryInformationForm = ({
  className,
  control,
  register,
  defaultValue,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker
          label="Date Needed:"
          className="md:mr-4"
          name="date_needed"
          control={control}
        />
        <Input
          label="Square Count:"
          placeholder="24"
          type="number"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          register={register}
          name="square_count"
          defaultValue={defaultValue?.square_count || ""}
        />
        <Input
          label="Total Perimeter LF:"
          placeholder="245"
          type="number"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
          register={register}
          name="total_perimeter"
          defaultValue={defaultValue?.total_perimeter || ""}
        />
        <Input
          label="Ridge LF:"
          placeholder="245"
          type="number"
          className="mb-4 md:mb-0"
          applyMarginBottom={true}
          register={register}
          name="ridge_lf"
          defaultValue={defaultValue?.ridge_lf || ""}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <CustomDatePicker
          label="Build Date:"
          className="md:mr-4"
          name="build_date"
          control={control}
          defaultValue={defaultValue?.build_date || ""}
        />
        <Input
          label="Valley SF:"
          placeholder="245"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          applyMarginBottom={true}
          register={register}
          name="valley_sf"
          defaultValue={defaultValue?.valley_sf || ""}
        />
        <Input
          label="Hip and Ridge LF:"
          placeholder="235"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          applyMarginBottom={true}
          register={register}
          name="hip_and_ridge_lf"
          defaultValue={defaultValue?.hip_and_ridge_lf || ""}
        />
        <Input
          label="Drip Edge LF:"
          placeholder="245"
          type="number"
          className="mb-4 md:mb-0"
          applyMarginBottom={true}
          register={register}
          name="drip_edge_lf"
          defaultValue={defaultValue?.drip_edge_lf || ""}
        />
      </InputContainer>
    </div>
  );
};

export default DeliveryInformationForm;
