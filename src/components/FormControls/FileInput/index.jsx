import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

const FileInput = ({ className, label, id, onChange, name = "" }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    onChange(event);
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className="block w-full text-sm font-medium text-gray-900 mb-4"
      >
        {label}
      </label>
      <div className="relative outline outline-1 outline-gray-300 rounded-md outline-offset-8">
        <input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        />
        <div className="flex flex-col justify-center items-center hover:bg-white bg-gray-50 border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md p-4 cursor-pointer">
          {fileName ? (
            fileName
          ) : (
            <>
              {" "}
              <FaUpload className="mr-2" />
              <span>{fileName || "Upload files"}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInput;
