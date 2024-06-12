import React from "react";
import { Radio } from "antd";

const RadioBox = ({ label, name, options, className, defaultValue }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <label className="mr-4 w-full md:max-w-xs">{label}</label>
      <Radio.Group name={name} defaultValue={defaultValue} className="w-full">
        {options.map((option, index) => (
          <Radio key={index} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioBox;
