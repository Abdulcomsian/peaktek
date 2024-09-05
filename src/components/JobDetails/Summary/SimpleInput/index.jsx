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
  readOnly,
  label = "",
  vertical = false,
  labelClass = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${
        vertical ? "flex-col !items-start" : ""
      } `}
    >
      {label ? (
        <label htmlFor={id} className={`${labelClass}`}>
          {label}
        </label>
      ) : null}
      <input
        type={type}
        id={id}
        readOnly={readOnly}
        name={name}
        className={`grow bg-slate-100 hover:bg-bluish border border-bluish hover:border hover:border-indigo-600 text-indigo-600 hover:placeholder:text-indigo-600 text-sm rounded focus:outline-none ${className}  p-[2px]`}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={readOnly ? undefined : onChange}
      />
    </div>
  );
};

export default SimpleInput;
