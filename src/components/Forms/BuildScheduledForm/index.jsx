import React from "react";
import { InputContainer } from "@components";
import { Input, DateSelector } from "@components/FormControls";
import { Button } from "@components/UI";

const BuildScheduledForm = ({ register, errors }) => {
  return (
    <div className="w-full">
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <DateSelector
          label="Build Date"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("buildDate", { required: "Build Date is required" })}
          error={errors?.buildDate && <p>{errors.buildDate.message}</p>}
        />
        <Input
          label="Build Time"
          placeholder="7:00 AM"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("buildTime", { required: "Build Time is required" })}
          error={errors?.buildTime && <p>{errors.buildTime.message}</p>}
        />
      </InputContainer>

      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Home Owner"
          placeholder="Alex"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("homeOwner", { required: "Home Owner is required" })}
          error={errors?.homeOwner && <p>{errors.homeOwner.message}</p>}
        />
        <Input
          label="Homeowner Email"
          placeholder="example@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("homeOwnerEmail", {
            required: "Homeowner Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          error={
            errors?.homeOwnerEmail && <p>{errors.homeOwnerEmail.message}</p>
          }
        />
      </InputContainer>

      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Contractor"
          placeholder="JL Construction LLC"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("contractor", { required: "Contractor is required" })}
          error={errors?.contractor && <p>{errors.contractor.message}</p>}
        />
        <Input
          label="Contractor Email"
          placeholder="example@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("contractorEmail", {
            required: "Contractor Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          error={
            errors?.contractorEmail && <p>{errors.contractorEmail.message}</p>
          }
        />
      </InputContainer>

      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Supplier"
          placeholder="Home Depot"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("supplier", { required: "Supplier is required" })}
          error={errors?.supplier && <p>{errors.supplier.message}</p>}
        />
        <Input
          label="Supplier Email"
          placeholder="example@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          {...register("supplierEmail", {
            required: "Supplier Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          error={errors?.supplierEmail && <p>{errors.supplierEmail.message}</p>}
        />
      </InputContainer>
    </div>
  );
};

export default BuildScheduledForm;
