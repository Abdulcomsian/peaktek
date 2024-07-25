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
  const antdDefaultValue = defaultValue
    ? moment(defaultValue, "DD/MM/YYYY")
    : new Date().toLocaleDateString();

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
              console.log(date, date.format("DD/MM/YYYY"));
              const formattedDate = date ? date.format("DD/MM/YYYY") : null;
              field.onChange(date); // Update form value
            }}
            value={field.value || ""}
            defaultValue={dayjs(antdDefaultValue, "DD/MM/YYYY")}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
