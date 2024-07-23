import React from "react";
import { ImageIcon } from "@components/UI";
import { FilesUploader } from "@components/FormControls";
const Photos = () => {
  return (
    <div>
      <FilesUploader icon={<ImageIcon />} />
      <div className="flex mt-4 ">
        <button className="font-poppins font-medium text-base text-white btn-gradient  px-4 py-1 rounded-md">
          Save
        </button>
        <button className="font-poppins font-medium text-base text-black  px-4 py-1 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Photos;
