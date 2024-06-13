import React from "react";
import { FaUpload } from "react-icons/fa";

const Input = ({
  className = "",
  label,
  type = "text",
  placeholder,
  id,
  value,
  onChange,
  applyMarginBottom = false,
  name = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className={`block w-full text-sm font-medium text-gray-900 ${
          applyMarginBottom ? "mb-2" : ""
        }`}
      >
        {label}
      </label>
      {type === "file" ? (
        <div className="relative">
          <input
            type="file"
            id={id}
            name={name}
            onChange={onChange}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <div className="bg-gray-50 border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md flex justify-center items-center p-4 cursor-pointer">
            <FaUpload className="mr-2" />
            <span>{placeholder || "Upload file"}</span>
          </div>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={`bg-gray-50 hover:bg-white outline-none border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500`}
        />
      )}
    </div>
  );
};

export default Input;
