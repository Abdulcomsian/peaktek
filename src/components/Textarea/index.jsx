import React from "react";

const Textarea = ({ id, label, className, value, onChange, placeholder }) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        value={value}
        onChange={onChange}
        className="bg-gray-50 hover:bg-white outline-none border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
