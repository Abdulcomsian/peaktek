import { NavLink, useNavigate } from "react-router-dom";
import { Button, Logo } from "@components";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "@context/AuthContext";
import listupIcon from "@assets/images/listUp.svg";
import clipboardCheck from "@assets/images/clipboardCheck.svg";
import settingsMinimalistic from "@assets/images/settingsMinimalistic.svg";
import FileText from "@assets/images/FileText.svg";
import GPS from "@assets/images/GPS.svg";
import { useSelector } from "react-redux";

export default function Sidebar({ isShow, onCloseSidebar }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.login?.user);
  console.log("user data in sidebar", userData?.role?.name);

  // Sidebar links
  const sidebarLinks = [
    {
      id: 1,
      linkSrc: "/dashboard/jobs",
      linkText: GPS,
    },
    {
      id: 2,
      linkSrc: "/dashboard/users-list",
      linkText: listupIcon,
    },
    {
      id: 3,
      linkSrc: "/dashboard/sub-contractor-list",
      linkText: clipboardCheck,
    },
    {
      id: 4,
      linkSrc: "/dashboard/suppliers-list",
      linkText: settingsMinimalistic,
    },
    {
      id: 5,
      linkSrc: "/dashboard/adjustors-list",
      linkText: FileText,
    },
  ];

  // Filter the links based on the user role
  const filteredLinks =
    userData?.role?.name === "Manager" || userData?.role?.name === "Company"
      ? sidebarLinks
      : sidebarLinks?.filter((link) => link.id === 1); // Only show the first link for other roles

  const handleLogout = async function () {
    await logout();
    navigate("/");
  };

  return (
    <div
      className="dashboard-sidebar gradient-t-b flex flex-col items-center"
      style={isShow ? { transform: "translateX(0)" } : {}}
    >
      <Button className="btn-mob-nav-close" onClick={onCloseSidebar}>
        &times;
      </Button>
      <div className="sidebar-logo mb-8">
        <Logo className="w-12 h-10" varient="white-main" />
      </div>
      <ul className="flex flex-col gap-4 justify-center items-center px-3">
        {filteredLinks?.map((link) => (
          <li className="mainNavLinks" key={link?.id}>
            <NavLink
              to={link?.linkSrc}
              className="p-2 inline-flex items-center justify-center border-none text-white fill-slate-100 hover:bg-blue-500 rounded-md"
            >
              <img src={link.linkText} alt="" />
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
