import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";
const CustomDatePicker = ({ label }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <MdDateRange className="text-black" />
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholderText="Select date"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
