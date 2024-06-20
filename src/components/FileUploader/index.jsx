import React, { Fragment, useState, useRef } from "react";

const FileUploader = ({ label, id }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    // Filter selectedFiles to only keep PDF files
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles([...files, ...pdfFiles]);
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
    <Fragment>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <div
        className="w-full flex items-center justify-center border border-solid border-gray-400 rounded-lg h-40 bg-white outline outline-1 outline-solid outline-gray-400 outline-offset-8 cursor-pointer"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
        {files.length === 0 ? (
          <label
            htmlFor={id}
            className="flex flex-col items-center cursor-pointer"
          >
            <p className="text-gray-600 mb-2">Drag and drop files or</p>
            <p className="text-blue-600">Upload from your computer</p>
          </label>
        ) : (
          <ul className="flex justify-center text-gray-700">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default FileUploader;
