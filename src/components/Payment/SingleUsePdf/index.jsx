import { FileUploader } from "@components";
import { UploaderInputs } from "@components/index";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowFileIcon, Button, ImageIcon } from "@components/UI";

const SingleUsePdf = () => {
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = function (data) {
    console.log("UPLOADING FILE", data);
  };
  return (
    <Fragment>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <UploaderInputs
          register={register}
          id="pdfs"
          name="pdfs"
          icon={<ArrowFileIcon />}
          fileTypes={["application/pdf"]}
          error={errors.pdfs && formatErrorName(errors.pdfs.message)}
          setValue={setFiles} // You may need to pass this prop if UploaderInputs does not manage its own state
        />
        <Button type="submit" variant="gradient" className="mt-4">
          Save
        </Button>
      </form>
    </Fragment>
  );
};

export default SingleUsePdf;
