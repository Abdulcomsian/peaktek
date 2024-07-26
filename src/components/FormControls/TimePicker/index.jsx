import React from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";

const CustomTimePicker = ({ label, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <TimePicker
        defaultValue={dayjs("12:08:23", "HH:mm:ss")}
        size="large"
        className="w-full bg-gray-50 p-2 focus:outline-1 focus:outline-blue-500"
      />
    </div>
  );
};

export default CustomTimePicker;
