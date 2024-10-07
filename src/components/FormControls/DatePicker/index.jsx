import React from "react";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/en";

const CustomDatePicker = ({
  label,
  className,
  control,
  name,
  defaultValue,
  disabled,
  applyMarginBottom = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        className={`block ${
          applyMarginBottom ? "mb-2" : ""
        } text-sm font-medium text-gray-700 dark:text-gray-300`}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue ? dayjs(defaultValue, "MM/DD/YYYY") : null}
        render={({ field }) => (
          <DatePicker
            {...field}
            format="MM/DD/YYYY"
            placeholder="Select date"
            className="w-full bg-gray-50 p-2 focus:outline-1 focus:outline-blue-500"
            size="large"
            onChange={(date) => {
              field.onChange(date ? date.format("MM/DD/YYYY") : null); // Update form value in DD/MM/YYYY format
            }}
            value={field.value ? dayjs(field.value, "MM/DD/YYYY") : null}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
