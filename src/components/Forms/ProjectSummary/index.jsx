import React from "react";
import Input from "@components/Input";
import InputContainer from "@components/InputContainer";
const ProjectSummaryForm = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Job Total :"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Customer Paid Upgrades :"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Deductible :"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="mb-4 md:mb-0"
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="ACV Check :"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="RCV Check :"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="md:mr-4  mb-4 md:mb-0"
        />
        <Input
          label="Supplemental Items :"
          placeholder="john Snow"
          type="text"
          applyMarginBottom={true}
          className="mb-4 md:mb-0"
        />
      </InputContainer>
    </div>
  );
};

export default ProjectSummaryForm;
