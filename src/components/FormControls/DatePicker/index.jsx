import React from "react";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/en";
import moment from "moment";

const CustomDatePicker = ({
  label,
  className,
  control,
  name,
  defaultValue,
  disabled,
}) => {
  // Format defaultValue for Ant Design DatePicker
  const antdDefaultValue = defaultValue
    ? dayjs(defaultValue, "DD/MM/YYYY")
    : undefined;

  return (
    <div className={`w-full ${className}`}>
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            {...field}
            format="DD/MM/YYYY"
            placeholder="Select date"
            className="w-full bg-gray-50 p-2 focus:outline-1 focus:outline-blue-500"
            size="large"
            onChange={(date) => {
              const formattedDate = date ? date.format("DD/MM/YYYY") : null;
              field.onChange(formattedDate); // Update form value
            }}
            defaultValue={
              antdDefaultValue ? moment(antdDefaultValue) : undefined
            }
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
