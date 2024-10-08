import React, { useEffect, useState } from "react";
import { Input } from "..";
import UploadedImageItems from "@components/UploaderInputs/UploadedImageItems";

export default function SimpleFileUploader({
  name,
  id,
  register,
  label,
  require,
  disabled,
  multiple,
  fileTypes,
  applyMarginBottom = false,
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => console.log(files), [files]);

  const handleFiles = (selectedFiles) => {
    const filteredFiles = Array.from([...selectedFiles]).filter((file) =>
      fileTypes.includes(file.type)
    );

    console.log("FILTERD FILES", filteredFiles);

    setFiles((files) => [...filteredFiles]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const getShortFileName = (name) => {
    const [fileName, extension] = name.split(".");
    if (fileName.length > 5) {
      return `${fileName.substring(0, 5)}...${extension}`;
    }
    return name;
  };

  const handleDeletFileItem = function (id) {
    setFiles((files) => files.filter((_, i) => i !== id));
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`block w-full text-sm font-medium text-gray-900 ${
            applyMarginBottom ? "mb-2" : "mb-1"
          }`}
        >
          {label}
        </label>
      )}
      <input
        type="file"
        accept={fileTypes.join(",")}
        multiple={multiple}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        id={id}
        name={name}
        className="outline-none border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500"
        {...register(name, {
          required: require ? `${name} must be required` : false,
          onChange: handleFileChange,
        })}
      />
      <UploadedImageItems
        files={files}
        onDeleteFileItem={handleDeletFileItem}
      />
    </div>
  );
}
