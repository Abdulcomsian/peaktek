import React from "react";
import { InputContainer } from "@components";
import { Input, TextBox } from "@components/FormControls";

const ProjectSummaryForm = ({ register, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <h4 className="font-semibold text-lg mb-4">Project Summary</h4>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Job Total :"
          placeholder="type"
          className="md:mr-4  mb-4 md:mb-0"
          type="number"
          name="job_total"
          id="job_total"
          register={register}
        />
        <Input
          label="Customer Paid Upgrades :"
          type="number"
          placeholder="type"
          className="md:mr-4  mb-4 md:mb-0"
          name="customer_paid_upgrades"
          id="customer_paid_upgrades"
          register={register}
        />
        <Input
          label="Deductible :"
          placeholder="type"
          className="mb-4 md:mb-0"
          name="deductible"
          id="deductible"
          register={register}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="ACV Check :"
          placeholder="type"
          className="md:mr-4  mb-4 md:mb-0"
          name="acv_check"
          id="acv_check"
          register={register}
        />
        <Input
          label="RCV Check :"
          placeholder="type"
          className="md:mr-4  mb-4 md:mb-0"
          name="rcv_check"
          id="rcv_check"
          register={register}
        />
        <Input
          label="Supplemental Items :"
          placeholder="type"
          className="mb-4 md:mb-0"
          name="supplemental_items"
          id="supplemental_items"
          register={register}
        />
      </InputContainer>
    </div>
  );
};

export default ProjectSummaryForm;
