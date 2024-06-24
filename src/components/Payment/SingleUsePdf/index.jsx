import { FileUploader } from "@components";
import React, { Fragment } from "react";

const SingleUsePdf = () => {
  return (
    <Fragment>
      <FileUploader label="Upload new PDF:" id="fileUploader" />
    </Fragment>
  );
};

export default SingleUsePdf;
