import React, { Fragment } from "react";
import { CkeditorComponent, Button } from "@components";
import { FaRegEdit } from "react-icons/fa";
const IntroductionSidebarForm = () => {
  return (
    <Fragment>
      <div className="flex justify-between">
        <h2 className="text-base uppercase">Page Content</h2>
        <Button className="px-4 py-2 bg-white rounded-md font-medium">
          View Page
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-4 cursor-pointer">
        <span className="font-semibold">Introduction</span>
        <FaRegEdit />
      </div>
      <div className="p-8 bg-white flex-grow shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  rounded-lg dark:border-gray-700">
        <CkeditorComponent />
      </div>
    </Fragment>
  );
};

export default IntroductionSidebarForm;
