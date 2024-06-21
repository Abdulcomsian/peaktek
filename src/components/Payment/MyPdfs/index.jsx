import { SearchInput } from "@components";
import React, { Fragment } from "react";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { MdList } from "react-icons/md";
const MyPdfs = () => {
  return (
    <Fragment>
      <h1 className="text-black font-semibold mb-8">My PDFs</h1>
      <SearchInput className="max-w-sm mb-8" size="large" />

      <div className="flex justify-between items-center mb-8">
        <span>Files /</span>
        <div className="flex justify-between items-center gap-2 ">
          <BsFillGrid3X2GapFill className="w-6 h-6 text-gray-300" />
          <MdList className="w-6 h-6 text-gray-300" />
        </div>
      </div>
      <p className="text-gray-600 text-sm">You have not uploaded any PDFs</p>
    </Fragment>
  );
};

export default MyPdfs;
