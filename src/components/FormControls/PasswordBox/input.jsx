import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const PasswordBox = ({
  control,
  name,
  label,
  placeholder,
  id,
  error,
  touched,
  disabled,
  className,
  rules, // added for validation rules
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
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input.Password
            size="large"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className={`${
              error && touched
                ? "border border-red-600"
                : "border border-gray-300"
            } bg-gray-50 text-gray-900 text-sm rounded-md w-full p-2.5 focus:outline-none ${
              error && touched
                ? "focus:border-red-600 focus:ring-0 outline-none "
                : "focus:border-blue-500 hover:bg-white"
            }`}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            {...field} // spread field props to the Input.Password component
          />
        )}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordBox;
