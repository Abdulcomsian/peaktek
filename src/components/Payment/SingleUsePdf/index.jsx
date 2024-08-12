import { FileUploader } from "@components";
import { UploaderInputs } from "@components/index";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { ImageIcon } from "@components/UI";

const SingleUsePdf = () => {
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data) {};
  return (
    <Fragment>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* <FileUploader label="Upload new PDF:" id="fileUploader" /> */}
        <UploaderInputs
          wrapperClass="my-upload-wrapper"
          title="Upload files"
          name="files"
          register={register}
          require={true}
          fileTypes={["image/jpeg", "image/png"]}
          icon={<ImageIcon />}
          setFiles={setFiles}
          files={files}
          id="files"
        />
      </form>
    </Fragment>
  );
};

export default SingleUsePdf;
