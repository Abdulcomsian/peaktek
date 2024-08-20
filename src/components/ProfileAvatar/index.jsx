import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileAvatar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const items = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-base font-normal">User name</span>
      <span className="inline-block w-10 h-10 rounded-full border border-gray-300"></span>
      <Dropdown
        menu={{
          items,
        }}
      >
        <div onClick={(e) => e.preventDefault()}>
          <DownOutlined className="text-gray-600 w-3" />
        </div>
      </Dropdown>
    </div>
  );
}
