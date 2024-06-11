import React from "react";

const OtherInput = ({ label, id, className, applyMarginBottom = false }) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className={`w-full md:w-48 text-sm font-medium text-gray-900 ${
          applyMarginBottom ? "mb-2" : ""
        } `}
      >
        {label}
      </label>
      <input
        label={id}
        className={`bg-gray-50 hover:bg-white outline-none border border-gray-300 hover:border-[0.5px] hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500 mb-4 md:mb-0 md:mx-4`}
      />
      <input
        label={id}
        className={`bg-gray-50 hover:bg-white outline-none border border-gray-300 hover:border-[0.5px] hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500`}
      />
    </div>
  );
};

export default OtherInput;
