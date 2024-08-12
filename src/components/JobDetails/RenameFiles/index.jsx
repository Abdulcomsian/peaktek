import React from "react";
import { TextBox } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { baseURL } from "@services/config";
const RenameFiles = ({ file }) => {
  const showFileHandler = (file) => {
    const fullFileUrl = `${baseURL}${file.media_url || file?.image_url}`;
    window.open(fullFileUrl, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row mb-4">
      <TextBox
        placeholder="Enter file name"
        type="text"
        name="filename"
        className="md:mr-4 mb-4 md:mb-0 md:max-w-sm"
      />{" "}
      <div className="flex justify-center">
        <Button
          className="bg-green-500 hover:bg-green-700 px-4 py-1 mr-4 text-white"
          onClick={() => showFileHandler(file)}
        >
          View File
        </Button>{" "}
        <Button className={`text-white btn-gradient px-4 py-1`}>Save</Button>
      </div>
    </div>
  );
};

export default RenameFiles;
