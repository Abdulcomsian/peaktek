import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Logout
      </a>
    ),
  },
];

export default function ProfileAvatar() {
  return (
    <div className="flex items-center  gap-2">
      <span className="text-base font-normal">User name</span>
      <span className="inline-block w-10 h-10 rounded-full border border-gray-300"></span>
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <DownOutlined className="text-gray-600 w-3" />
        </a>
      </Dropdown>
    </div>
  );
}
