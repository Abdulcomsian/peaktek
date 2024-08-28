import React, { forwardRef } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";

const CustomTimePicker = forwardRef(
  ({ label, className, value, name, onChange, error, touched }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <TimePicker
          use12Hours
          format="h:mm a"
          value={value ? dayjs(value, "h:mm a") : null}
          size="large"
          name={name}
          onChange={onChange}
          className="w-full bg-gray-50 p-2 focus:outline-blue-500"
          ref={ref} // Forwarded ref here
        />
        {error && touched && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

export default CustomTimePicker;
