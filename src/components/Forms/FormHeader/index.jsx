import React from "react";
import { Button } from "@components";
import { FaRegEdit } from "react-icons/fa";
const FormHeader = ({ className, btnText, pageTitle }) => {
  return (
    <div className={className}>
      <div className="flex justify-between">
        <h2 className="text-base uppercase">Page Content</h2>
        <Button className="px-4 py-2 bg-white rounded-md font-medium">
          {btnText}
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-4 cursor-pointer">
        <span className="font-semibold">{pageTitle}</span>
        <FaRegEdit />
      </div>
    </div>
  );
};

export default FormHeader;
