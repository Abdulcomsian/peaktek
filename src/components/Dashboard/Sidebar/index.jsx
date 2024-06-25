import { Link, NavLink } from "react-router-dom";
import { Button, Logo } from "@components";

export default function Sidebar({ isShow, onCloseSidebar }) {
  const sidebarLinks = [
    {
      id: 1,
      linkSrc: "/dashboard",
      linkText: "Jobs",
    },
    {
      id: 2,
      linkSrc: "users",
      linkText: "Users",
    },
    {
      id: 3,
      linkSrc: "manage-user",
      linkText: "Manage User",
    },
    {
      id: 4,
      linkSrc: "/dashboard",
      linkText: "Invoices",
    },
    {
      id: 5,
      linkSrc: "completedTasks",
      linkText: "Completed Jobs",
    },
  ];
  return (
    <div
      className="dashboard-sidebar"
      style={isShow ? { transform: "translateX(0)" } : {}}
    >
      <Button className="btn-mob-nav-close" onClick={onCloseSidebar}>
        &times;
      </Button>
      <div className="sidebar-logo">
        <Logo className="w-10 h-10" />
        <div className="auth-dropdown">
          <div id="dropdown-basic" className="auth-dropdown-toggler">
            <div>
              <span>PeakTech Roofing</span>
              <p className="text-sm text-gray-500">admin@email.company</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex flex-col justify-center items-center pt-10">
        {sidebarLinks?.map((link) => (
          <li className="py-2 hover:bg-blue-200 w-full " key={link?.id}>
            <NavLink to={link?.linkSrc} className="pl-5">
              {link?.linkText}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
