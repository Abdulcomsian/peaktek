import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function DropDown({
  items,
  label,
  id,
  vertical,
  className,
  labelClass,
  defaultText = "Click me",
}) {
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
      <Dropdown
        className={`flex bg-slate-100 hover:bg-bluish border border-bluish hover:border hover:border-indigo-600 hover:placeholder:text-indigo-600 text-sm rounded focus:outline-none ${className}`}
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          {defaultText}
          <DownOutlined className="ml-auto" />
        </a>
      </Dropdown>
    </div>
  );
}
