import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectBox = ({
  className,
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
}) => {
  // Handle onChange to map value directly
  const handleChange = (selectedValues) => {
    onChange(selectedValues); // Pass the array of values to the parent
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 text-opacity-30 mb-4"
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
        className="summary-select border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-md block w-full"
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
