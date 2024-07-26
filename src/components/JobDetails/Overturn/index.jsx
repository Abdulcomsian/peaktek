import { Ckeditor, FileUploader } from "@components/FormControls";
import { OverturnForm } from "@components/Forms";
import { ArrowFileIcon, ImageIcon } from "@components/UI";
import React, { Fragment } from "react";
import Button from "@components/JobDetails/ui/Button";
const Overturn = () => {
  return (
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Overturn Page
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <OverturnForm className="mb-4" />
        <div className="flex flex-col md:flex-row">
          <FileUploader
            label="Images"
            id="images"
            icon={<ImageIcon />}
            className="w-full mb-4 mr-4"
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your image here, or"
            files={""}
            setFiles={""}
            handleDelete={""}
          />
          <FileUploader
            label="Documents"
            id="documents"
            icon={<ArrowFileIcon />}
            className="w-full mb-4"
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your documents here, or"
            files={""}
            setFiles={""}
            handleDelete={""}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <FileUploader
            label="Manufacturer Document"
            id="manufacturer_document"
            icon={<ArrowFileIcon />}
            className="w-full mb-4 mr-4"
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your documents here, or"
            files={""}
            setFiles={""}
            handleDelete={""}
          />
          <Ckeditor className="w-full max-w-2xl" label="Notes" id="notes" />
        </div>
        <div className="flex">
          <Button className="text-black mr-4 border border-gray-300 px-4 py-1">
            Cancel
          </Button>
          <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
            Approved
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Overturn;
