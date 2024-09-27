import React from "react";
import { Select } from "antd";

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
  register,
  required = true,
  control,
  error = "",
  defaultValue = null,
  onChange,
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
      <Select
        id={id}
        name={name}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        className={`basic-multi-select ${className}`}
        classNamePrefix="select"
        onChange={onChange}
        {...register?.(name, {
          required: required ? `${name} is required` : false,
        })}
      />
      {error && <p className="text-sm mt-1 text-red-500 py-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
