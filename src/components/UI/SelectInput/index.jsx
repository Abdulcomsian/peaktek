import { Select } from "antd";
import { Controller } from "react-hook-form";

export default function SelectInput({
  control,
  name,
  mode = "multiple",
  rules,
  placeholder,
  options,
  label,
  labelClass,
  id,
  defaultValue = [], // Default to an empty array if not provided
}) {
  return (
    <div>
      {label && (
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            className="text-sm"
            {...field}
            mode="multiple"
            style={{ width: "100%" }}
            placeholder={placeholder}
            options={options}
            defaultValue={defaultValue}
          />
        )}
      />
    </div>
  );
}
