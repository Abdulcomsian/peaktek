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
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue ? dayjs(defaultValue, "DD/MM/YYYY") : null}
        render={({ field }) => (
          <DatePicker
            {...field}
            format="DD/MM/YYYY"
            placeholder="Select date"
            className="w-full bg-gray-50 p-2 focus:outline-1 focus:outline-blue-500"
            size="large"
            onChange={(date) => {
              field.onChange(date ? date.format("DD/MM/YYYY") : null); // Update form value in DD/MM/YYYY format
            }}
            value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
