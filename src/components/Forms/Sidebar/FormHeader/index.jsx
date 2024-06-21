import React from "react";
import { Button } from "@components";
import { FaRegEdit } from "react-icons/fa";
const FormHeader = ({ className, btnText, pageTitle }) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-bold text-gray-600 uppercase">
          Page Content
        </h2>
        <Button className="px-3 py-2 bg-white border border-gray-300 hover:text-white text-gray-600 hover:bg-gray-300 text-sm rounded-md font-medium">
          {btnText}
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-8 cursor-pointer">
        <span className="font-semibold">{pageTitle}</span>
        <FaRegEdit />
      </div>
    </div>
  );
};

export default FormHeader;
