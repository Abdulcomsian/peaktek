import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";

const PasswordBox = ({
  className,
  disabled,
  label,
  placeholder,
  id,
  value,
  onBlur,
  onChange,
  name,
  error,
  touched,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label}
        </label>
      )}
      <Input.Password
        size="large"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className={`${
          error && touched ? "border border-red-600" : "border border-gray-300"
        } bg-gray-50 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none ${
          error && touched
            ? "focus:border-red-600 focus:ring-0 outline-none "
            : "focus:border-blue-500 hover:bg-white"
        }`}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && touched && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordBox;
