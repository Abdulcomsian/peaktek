import { FileUploader } from "@components";
import React from "react";

const SingleUsePdf = () => {
  return (
    <div>
      <FileUploader label="Upload new PDF:" id="fileUploader" />
    </div>
  );
};

export default SingleUsePdf;
