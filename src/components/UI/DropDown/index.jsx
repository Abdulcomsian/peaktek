import { Select } from "antd";

export default function DropDown({
  options = [],
  label,
  id = "",
  vertical,
  className,
  labelClass,
  defaultValue = options[0]?.value,
  onChange,
}) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div
      className={`flex items-center gap-2 ${
        vertical ? "flex-col !items-start" : ""
      } ${labelClass}`}
    >
      {label ? (
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <Select
        id={id}
        defaultValue={defaultValue}
        style={{
          width: `100%`,
        }}
        onChange={onChange}
        options={options}
      />
    </div>
  );
}
