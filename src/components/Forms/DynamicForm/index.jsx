import React from "react";
import { Input } from "antd";

const DynamicForm = ({ labels, percentage }) => {
  return (
    <div className="mt-4">
      {labels?.map((label, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-center py-2"
        >
          <label className="w-full md:max-w-48 mb-2 md:mb-0">{label}</label>
          <Input
            size="large"
            className="w-full md:max-w-md mr-4 mb-2 md:mb-0"
          />
          <Input
            size="large"
            className="w-full md:max-w-md mr-4 mb-2 md:mb-0"
          />
          <div className="flex items-center md:justify-center w-full md:max-w-32 py-2 rounded-lg mb-2 md:mb-0 ">
            10.00 %
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
