import React, { forwardRef } from "react";

const TextBox = forwardRef(
  (
    {
      className,
      disabled,
      readOnly, // Add readOnly prop
      label,
      type,
      placeholder,
      id,
      value,
      onBlur,
      onChange,
      name,
      error,
      touched,
      defaultValue,
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block w-full text-sm font-medium text-gray-900 mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly} // Apply readOnly attribute
          ref={ref}
          className={`border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none 
          ${
            readOnly
              ? "disabled:cursor-not-allowed"
              : "hover:bg-white hover:border-blue-500 focus:border-blue-500"
          }`}
        />
        {error && touched && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

export default TextBox;
