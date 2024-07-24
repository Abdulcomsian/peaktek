import React from "react";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const FilesUploader = ({ icon, className, action, headers }) => {
  const onChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log("Selected File:", info.file);
      console.log("File List:", info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const props = {
    name: "file",
    multiple: true,
    action: action, // default action URL
    headers: headers, // default headers if not provided
    onChange,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props} className={className}>
      <div className="flex justify-center mb-4">{icon}</div>
      <p className="font-poppins text-xs">
        Drop your image here, or{" "}
        <span className="text-indigo-600 font-medium">browse</span>
      </p>
    </Dragger>
  );
};

export default FilesUploader;
