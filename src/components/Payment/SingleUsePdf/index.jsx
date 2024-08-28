import { UploaderInputs } from "@components/index";
import React, { useState } from "react";
import { ArrowFileIcon } from "@components/UI";
import { formateErrorName } from "../../../utils/helper";

const SingleUsePdf = ({ errors, register }) => {
  const [files, setFiles] = useState([]);
  return (
    <>
      <UploaderInputs
        register={register}
        id="pdfs"
        name="pdfs"
        icon={<ArrowFileIcon />}
        fileTypes={["application/pdf"]}
        error={errors?.pdfs && formateErrorName(errors.pdfs.message)}
      />
    </>
  );
};

export default SingleUsePdf;
