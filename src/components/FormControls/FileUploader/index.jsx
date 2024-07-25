import React, { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

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

  const getShortFileName = (name) => {
    const [fileName, extension] = name.split(".");
    if (fileName.length > 5) {
      return `${fileName.substring(0, 5)}...${extension}`;
    }
    return name;
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <div
        className="w-full flex items-center justify-center  border-2 border-dotted border-blue-500 rounded-lg py-10 px-4 bg-white cursor-pointer"
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
        <label
          htmlFor={id}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="flex justify-center mb-4">{icon}</div>
          <p className="font-poppins text-sm text-gray-600">
            {text} <span className="text-indigo-600 font-medium">browse</span>
          </p>
        </label>
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-medium mb-2">File Previews</h3>
          <ul className="flex flex-wrap">
            {files.map((file, index) => (
              <li key={index} className="m-2 relative">
                <div className="border border-gray-400 p-2 rounded-lg">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-32 h-32 object-cover mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="absolute bottom-2 right-2 text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                  <p className="text-sm">{getShortFileName(file.file.name)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
