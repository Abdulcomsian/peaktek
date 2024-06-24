import { Select } from "antd";

const SelectInput = ({
  label,
  defaultValue = "",
  size = "middle",
  className,
  options,
  inputWrapperClass,
  onChange,
}) => {
  return (
    <div className={`${inputWrapperClass} mb-4`}>
      {label && (
        <label className="block w-full text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      <Select
        defaultValue={defaultValue}
        size={size}
        className={className}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectInput;
