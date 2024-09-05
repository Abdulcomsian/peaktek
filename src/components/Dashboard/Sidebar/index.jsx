import { NavLink, useNavigate } from "react-router-dom";
import { Button, Logo } from "@components";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "@context/AuthContext";
import listupIcon from "@assets/images/listUp.svg";
import clipboardCheck from "@assets/images/clipboardCheck.svg";
import settingsMinimalistic from "@assets/images/settingsMinimalistic.svg";
import FileText from "@assets/images/FileText.svg";
import JobIcon from "@assets/images/jobs.svg";
import GPS from "@assets/images/GPS.svg";
import { IoMdSettings } from "react-icons/io";
import { RiHomeLine } from "react-icons/ri";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

export default function Sidebar({ isShow, onCloseSidebar }) {
  const { logout, user: userData } = useAuth();
  const navigate = useNavigate();

  // Sidebar links
  const sidebarLinks = [
    {
      id: 1,
      linkSrc: "/welcome",
      linkText: <RiHomeLine />,
      text: "Dashboard",
    },
    {
      id: 2,
      linkSrc: "/jobs",
      linkText: <IoBagOutline />,
      text: "Jobs",
    },
    {
      id: 3,
      linkSrc: "/dashboard/users-list",
      linkText: listupIcon,
      text: "Reports",
    },
    {
      id: 4,
      linkSrc: "/dashboard/sub-contractor-list",
      linkText: clipboardCheck,
    },
    {
      id: 5,
      linkSrc: "/dashboard/suppliers-list",
      linkText: settingsMinimalistic,
    },
    {
      id: 6,
      linkSrc: "/dashboard/adjustors-list",
      linkText: FileText,
    },
    {
      id: 7,
      linkSrc: "/dashboard",
      linkText: <IoMdSettings />,
      text: "Settings",
    },
    {
      id: 8,
      linkSrc: "/dashboard",
      linkText: FileText,
    },
  ];

  // Filter the links based on the user role
  const filteredLinks =
    userData?.role?.name === "Manager" || userData?.role?.name === "Company"
      ? sidebarLinks
      : sidebarLinks?.filter((link) => link.id <= 2 || link.id === 7); // Only show the first link for other roles

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
      <div className="mt-5 mb-8">
        <Logo className="w-ful h-10" varient="white-main" />
      </div>
      <ul className="flex flex-col gap-4 px-3 mb-2 h-full">
        {filteredLinks?.map((link) => (
          <li
            className={`mainNavLinks ${link.id === 7 ? "mt-auto" : ""}`}
            key={link?.id}
          >
            <NavLink
              to={link?.linkSrc}
              className="p-2 inline-flex items-center gap-2 border-none text-white fill-slate-100 hover:bg-blue-500 rounded-md w-full"
            >
              {link.linkText}
              <p>{link.text}</p>
            </NavLink>
          </li>
        ))}
        <li>
          <div className="p-2 inline-flex items-center gap-2 border-none text-white fill-slate-100 hover:bg-blue-500 rounded-md w-full">
            <MdOutlineLogout onClick={handleLogout} />
            <p>Logout</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
