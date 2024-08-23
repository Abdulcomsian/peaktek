import React, { forwardRef } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DateSelector = forwardRef(
  ({ label, className, value, name, onChange, error, touched }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <DatePicker
          value={value ? dayjs(value, "DD/MM/YYYY") : null}
          size="large"
          onChange={onChange}
          name={name}
          format="DD/MM/YYYY"
          className="w-full bg-gray-50 p-2 focus:outline-blue-500"
          ref={ref}
        />
        {error && touched && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

export default DateSelector;
