import { Ckeditor } from "@components/FormControls";
import React, { Fragment } from "react";

const Notes = () => {
  return (
    <Fragment>
      <Ckeditor className="mb-4" />
      <div className="flex ">
        <button className="font-poppins font-medium text-base text-white btn-gradient  px-4 py-1 rounded-md">
          Save
        </button>
        <button className="font-poppins font-medium text-base text-black  px-4 py-1 rounded-md">
          Cancel
        </button>
      </div>
    </Fragment>
  );
};

export default Notes;
