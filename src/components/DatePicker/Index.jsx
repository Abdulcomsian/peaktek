import React, { useState } from "react";
import { DatePicker } from "antd";

const CustomDatePicker = ({ label }) => {
  return (
    <div className="w-full sm:mr-4">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <DatePicker
        name="dob"
        format="DD/MM/YYYY"
        //   disabledDate={disabledDate}
        placeholder="select_date"
        //   value={profileInfo.dob ? dayjs(String(profileInfo?.dob)) : undefined}
        //   onChange={(date) => handleChange("dob", date)}
        className="w-full bg-gray-50 p-2 focus:outline-1 focus:outline-blue-500"
        size="large"
      />
    </div>
  );
};

export default CustomDatePicker;
