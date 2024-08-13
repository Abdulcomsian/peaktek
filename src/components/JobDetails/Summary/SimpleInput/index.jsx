import React from "react";

const SimpleInput = ({
  id,
  className,
  type,
  placeholder,
  name,
  value,
  onChange,
  required,
  max,
}) => {
  return (
    <input
      type={type}
      id={id}
      maxLength={max}
      name={name}
      className={`bg-slate-100 hover:bg-bluish border border-bluish hover:border hover:border-indigo-600 text-indigo-600 hover:placeholder:text-indigo-600 text-sm rounded focus:outline-none ${className}  p-[2px]`}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={onChange}
    />
  );
};

export default SimpleInput;
