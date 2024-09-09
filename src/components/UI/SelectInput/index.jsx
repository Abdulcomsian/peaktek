import { Select, Space } from "antd";
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
}) {
  return (
    <div>
      {label ? (
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            className="tex-sm"
            id={id}
            {...field}
            mode={mode}
            allowClear
            style={{
              width: "100%",
            }}
            placeholder={placeholder}
            options={options}
          />
        )}
      />
    </div>
  );
}
