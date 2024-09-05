import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectBox = ({
  className,
  selectClassName,
  disabled,
  label,
  placeholder,
  id,
  value,
  onBlur,
  onChange,
  name,
  size,
  options = [],
  vertical = false,
}) => {
  // Handle onChange to map value directly
  const handleChange = (selectedValues) => {
    onChange(selectedValues); // Pass the array of values to the parent
  };

  return (
    <div
      className={`w-full flex items-center  ${
        vertical ? "flex-col !items-start" : ""
      } ${className}`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium text-gray-900 text-opacity-30 `}
        >
          {label}
        </label>
      )}
      <Select
        allowClear
        id={id}
        size={size}
        placeholder={placeholder}
        name={name}
        mode="multiple" // Enable multiple selections
        value={value || undefined}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`summary-select bg-slate-100 hover:bg-bluish border border-bluish hover:border hover:border-indigo-600 text-indigo-600 hover:placeholder:text-indigo-600 text-sm rounded focus:outline-none ${selectClassName}`}
        popupClassName="border-gray-300"
        maxTagCount="responsive" // Ensure selected tags are displayed in a row
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectBox;
