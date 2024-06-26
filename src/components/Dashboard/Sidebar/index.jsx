import { Link, NavLink } from "react-router-dom";
import { Button, Logo } from "@components";
import { RiUserSettingsLine } from "react-icons/ri";
import { LiaFileContractSolid } from "react-icons/lia";
import { GrCompliance } from "react-icons/gr";
import { GoTasklist } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";

export default function Sidebar({ isShow, onCloseSidebar }) {
  const sidebarLinks = [
    {
      id: 1,
      linkSrc: "/dashboard",
      linkText: <MdMyLocation size="24px" />,
    },
    {
      id: 2,
      linkSrc: "users",
      linkText: <GoTasklist size="24px" />,
    },
    {
      id: 3,
      linkSrc: "manage-user",
      linkText: <GrCompliance size="24px" />,
    },
    {
      id: 4,
      linkSrc: "/",
      linkText: <RiUserSettingsLine size="24px" />,
    },
    {
      id: 5,
      linkSrc: "completedTasks",
      linkText: <LiaFileContractSolid size="24px" />,
    },
  ];
  return (
    <div
      className="dashboard-sidebar bg-blue-950"
      style={isShow ? { transform: "translateX(0)" } : {}}
    >
      <Button className="btn-mob-nav-close" onClick={onCloseSidebar}>
        &times;
      </Button>
      <div className="sidebar-logo mb-8">
        <Logo className="w-10 h-10" />
      </div>
      <ul className="flex flex-col gap-4 justify-center items-center px-3">
        {sidebarLinks?.map((link) => (
          <li
            className="  mainNavLinks"
            key={link?.id}
          >
            <NavLink
              to={link?.linkSrc}
              className="p-2 inline-flex items-center justify-center border-none text-white fill-slate-100 hover:bg-blue-500 rounded-md "
            >
              {link?.linkText}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
