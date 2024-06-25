import { Link } from "react-router-dom";
import { Button, Logo } from "@components";

export default function Sidebar({ isShow, onCloseSidebar, children }) {
  return (
    <div
      className="dashboard-sidebar"
      style={isShow ? { transform: "translateX(0)" } : {}}
    >
      <Button className="btn-mob-nav-close" onClick={onCloseSidebar}>
        &times;
      </Button>
      {children}
    </div>
  );
}
