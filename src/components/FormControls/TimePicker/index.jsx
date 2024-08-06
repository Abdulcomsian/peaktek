import React from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";

const CustomTimePicker = ({
  label,
  className,
  value,
  name,
  onChange,
  error,
  touched,
}) => {
  const handleTimeChange = (time) => {
    onChange({
      target: {
        name,
        value: time,
      },
    });
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <TimePicker
        use12Hours
        format="h:mm a"
        value={value ? dayjs(value, "h:mm a") : null}
        size="large"
        onChange={handleTimeChange}
        className={`w-full bg-gray-50 p-2 focus:outline-1 ${
          error && touched ? "border border-red-600" : "focus:outline-blue-500"
        }`}
      />
      {error && touched && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTimePicker;
