import React from "react";
import { Radio } from "antd";
import { Controller } from "react-hook-form";

const pdfOptions = [
  { value: 1, name: "Upload pdf files", label: "Upload pdf files" },
  { value: 2, name: "text_page", label: "Text Page" },
];

const PdfOptions = ({
  verticle = false,
  name,
  control,
  onOptionSelected,
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const handleChange = function (e) {
          const newValue = e.target.value;
          if (onOptionSelected) onOptionSelected(newValue);

          onChange(newValue);
        };
        return (
          <Radio.Group
            onChange={handleChange}
            value={value}
            className={`${verticle ? "flex flex-col gap-2" : ""} ${className}`}
          >
            {pdfOptions.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      }}
    />
  );
};

export default PdfOptions;
