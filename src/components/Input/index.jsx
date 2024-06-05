import React from "react";

const Input = ({
  className,
  label,
  type = "text",
  placeholder,
  id,
  value,
  onChange,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-1 focus:outline-blue-500"
      />
    </div>
  );
};

export default Input;
