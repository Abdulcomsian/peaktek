import React from "react";
import { DynamicForm } from "@components/Forms";
import { Input } from "antd";
const ComissionTotal = ({ labels }) => {
  return (
    <div className="border-t-2 border-b-2 border-blue-600 py-4  mb-4 md:mb-0">
      <div className="flex flex-col md:flex-row items-center ">
        <label className="w-full md:max-w-48 mb-2 md:mb-0">
          Comission Total
        </label>
        <Input className="w-full md:max-w-sm lg:max-w-[27rem]" size="large" />
      </div>
      <DynamicForm labels={labels} />
    </div>
  );
};

export default ComissionTotal;
