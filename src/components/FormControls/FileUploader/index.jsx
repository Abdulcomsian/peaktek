import React, { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ArrowFileIcon, ImageIcon } from "@components/UI";

const FileUploader = ({
  label,
  id,
  fileTypes = [],
  icon,
  text,
  className,
  files,
  setFiles,
  handleDelete,
}) => {
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const filteredFiles = Array.from(selectedFiles).filter((file) =>
      fileTypes.includes(file.type)
    );

    const newFiles = filteredFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles([...files, ...newFiles]);
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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block w-full text-sm font-medium text-gray-900 mb-2"
      >
        {label}
      </label>
      <div
        className="w-full flex items-center justify-center border-2 border-dotted border-blue-500 rounded-lg py-10 px-4 bg-white cursor-pointer"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          className="hidden"
          accept={fileTypes.join(",")}
          onChange={handleFileChange}
          multiple
        />
        <label className="flex flex-col items-center cursor-pointer">
          <div className="flex justify-center mb-4">{icon}</div>
          <p className="font-poppins text-sm text-gray-600">
            {text} <span className="text-indigo-600 font-medium">browse</span>
          </p>
        </label>
      </div>
      {files?.length > 0 && (
        <div className="mt-4">
          <ul>
            {files?.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between border p-2 rounded mb-2"
              >
                <div className="mr-2">
                  {file.file.type.startsWith("image/") ? (
                    <ImageIcon />
                  ) : (
                    <ArrowFileIcon />
                  )}
                </div>
                <p className="text-sm">{file.file.name}</p>

                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="text-red-600"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
