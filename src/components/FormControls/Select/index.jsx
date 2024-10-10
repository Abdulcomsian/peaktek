import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";

const CustomSelect = ({
  className = "",
  label,
  id,
  name = "",
  placeholder = "Select...",
  options = [],
  isMulti = false,
  isDisabled = false,
  applyMarginBottom = false,
  control,
  required = true,
  error = "",
  defaultValue,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block w-full text-sm font-medium text-gray-900 ${
            applyMarginBottom ? "mb-2" : ""
          }`}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${name} is required` : false }}
        render={({ field }) => (
          <Select
            {...field}
            id={id}
            placeholder={placeholder}
            options={options}
            disabled={isDisabled}
            mode={isMulti ? "multiple" : "default"}
            className={`basic-multi-select ${className}`}
            classNamePrefix="select"
            onChange={(value) => field.onChange(value)} // Handle change
            defaultValue={defaultValue} // Set default value
          />
        )}
      />
      {error && <p className="text-sm mt-1 text-red-500 py-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
