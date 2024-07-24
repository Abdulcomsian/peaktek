import React, { Fragment } from "react";
import { ImageIcon } from "@components/UI";
import FilesUploader from "@components/FormControls/FilesUploader"; // Adjust import path accordingly

const Photos = () => {
  const token = localStorage.getItem("token");
  const uploadAction = "https://test7.accrualdev.com/api/update/job-content/1";
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return (
    <Fragment>
      <FilesUploader
        icon={<ImageIcon />}
        action={uploadAction}
        headers={headers}
      />
    </Fragment>
  );
};

export default Photos;
