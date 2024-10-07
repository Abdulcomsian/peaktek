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
