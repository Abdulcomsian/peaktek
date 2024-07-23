import React from "react";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const FilesUploader = ({ icon, className }) => (
  <Dragger {...props} className={className}>
    <div className="flex justify-center mb-4">{icon}</div>
    <p className="font-poppins text-xs">
      Drop your image here, or{" "}
      <span className="text-indigo-600 font-medium">browse</span>
    </p>
  </Dragger>
);
export default FilesUploader;
