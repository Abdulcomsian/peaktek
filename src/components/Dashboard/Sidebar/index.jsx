import { NavLink, useNavigate } from "react-router-dom";
import { Button, Logo } from "@components";
import { RiUserSettingsLine, RiLogoutCircleLine } from "react-icons/ri";
import { LiaFileContractSolid } from "react-icons/lia";
import { GrCompliance } from "react-icons/gr";
import { GoTasklist } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";
import { useAuth } from "@context/AuthContext";

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
export default function Sidebar({ isShow, onCloseSidebar }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async function () {
    await logout();
    navigate("/");
  };

  return (
    <div
      className="dashboard-sidebar gradient-t-b flex flex-col items-center "
      style={isShow ? { transform: "translateX(0)" } : {}}
    >
      <Button className="btn-mob-nav-close" onClick={onCloseSidebar}>
        &times;
      </Button>
      <div className="sidebar-logo mb-8">
        <Logo className="w-12 h-10" varient="white" />
      </div>
      <ul className="flex flex-col gap-4 justify-center items-center px-3">
        {sidebarLinks?.map((link) => (
          <li className="  mainNavLinks" key={link?.id}>
            <NavLink
              to={link?.linkSrc}
              className="p-2 inline-flex items-center justify-center border-none text-white fill-slate-100 hover:bg-blue-500 rounded-md "
            >
              {link?.linkText}
            </NavLink>
          </li>
        ))}
      </ul>
      <RiLogoutCircleLine
        className="mt-auto text-white m-3 mb-8 cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
}
