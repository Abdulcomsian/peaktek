import React from "react";
import Input from "@components/Input";
import OtherInput from "@components/OtherInput";
const JobCostForm = ({ className }) => {
  return (
    <div className={`bg-blue-50  w-full ${className}`}>
      <h1 className="font-bold text-black">JOB COST BREAK DOWN</h1>
      <Input
        applyMarginBottom={true}
        label="Replacement Cost Value (RCV):"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="Recoverable Depreciation:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="Customer Upgrades:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="Drip Edge:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="Ice & Water Barrier:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="Starter Strip:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="Emergency Tarp:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="10% Overhead:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="10% Profit:"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
      <OtherInput
        applyMarginBottom={true}
        label="Other:"
        className="flex flex-col md:flex-row justify-between items-center  mb-4"
      />
      <OtherInput
        applyMarginBottom={true}
        label="Other:"
        className="flex flex-col md:flex-row justify-between items-center  mb-4"
      />
      <OtherInput
        applyMarginBottom={true}
        label="Other:"
        className="flex flex-col md:flex-row justify-between items-center  mb-4"
      />
      <OtherInput
        applyMarginBottom={true}
        label="Other:"
        className="flex flex-col md:flex-row justify-between items-center  mb-4"
      />
      <Input
        applyMarginBottom={true}
        label="Balance Due:"
        placeholder="0.0"
        className="flex flex-col md:flex-row justify-between items-center mb-4"
      />
    </div>
  );
};

export default JobCostForm;
