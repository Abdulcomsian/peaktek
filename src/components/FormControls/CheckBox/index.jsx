import React from "react";

export default function CheckBox({
  wrapperClassName,
  label = "",
  id,
  name,
  disabled = false,
  register,
  onChange = () => {},
}) {
  return (
    <div className={`flex items-center gap-2 ${wrapperClassName}`}>
      {label && (
        <label htmlFor="status" className="font-semibold uppercase">
          {label}
        </label>
      )}
      {register ? (
        <input
          type="checkbox"
          disabled={disabled}
          className="h-6 w-6 border border-gray-300 bg-gray-50"
          id={id}
          name={name}
          {...register(name, { onChange })}
        />
      ) : (
        <input
          type="checkbox"
          disabled={disabled}
          className="h-6 w-6 border border-gray-300 bg-gray-50"
          id={id}
          name={name}
          onChange={onChange}
        />
      )}
    </div>
  );
}
