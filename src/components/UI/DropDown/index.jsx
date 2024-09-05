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
        <label className="" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <Dropdown
        className={`flex ${className}`}
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
