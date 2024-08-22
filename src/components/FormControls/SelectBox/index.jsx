import React, { forwardRef } from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectBox = forwardRef(
  (
    {
      className,
      disabled,
      label,
      placeholder,
      id,
      value,
      onBlur,
      onChange,
      name,
      error,
      touched,
      defaultValue,
      options = [], // Array of options for the select box
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {label}
          </label>
        )}
        <Select
          id={id}
          size="large"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          disabled={disabled}
          ref={ref}
          className={`custom-select ${
            error && touched ? "border-red-600" : "border-gray-300"
          } bg-gray-50  text-gray-900 text-sm rounded-md block w-full`}
          popupClassName={`${
            error && touched ? "border-red-600" : "border-gray-300"
          }`}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        {error && touched && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

export default SelectBox;
