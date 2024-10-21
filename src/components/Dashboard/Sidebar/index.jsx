import { NavLink, useNavigate } from "react-router-dom";
import { Button, Logo } from "@components";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "@context/AuthContext";
import listupIcon from "@assets/images/listUp.svg";
import clipboardCheck from "@assets/images/clipboardCheck.svg";
import { PiBagSimpleFill } from "react-icons/pi";
import settingsMinimalistic from "@assets/images/settingsMinimalistic.svg";
import FileText from "@assets/images/FileText.svg";
import JobIcon from "@assets/images/jobs.svg";
import GPS from "@assets/images/GPS.svg";
import { RiHomeLine } from "react-icons/ri";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

export default function Sidebar({ isShow, onCloseSidebar }) {
  const { logout, user: userData } = useAuth();
  const navigate = useNavigate();

  // Sidebar links
  const basicUserLinks = [
    {
      id: 9,
      linkSrc: "/dashboard",
      linkText: <RiHomeLine />,
      text: "Dashboard",
    },
    {
      id: 10,
      linkSrc: "/jobs",
      linkText: <PiBagSimpleFill />,
      text: "Jobs",
    },
    {
      id: 11,
      linkSrc: "/settings",
      linkText: <IoMdSettings />,
      text: "Settings",
    },
    // {
    //   id: 12,
    //   linkSrc: "/",
    //   linkText: <IoBagOutline />,
    // },
  ];
  const superAdminLinks = [
    {
      id: 1,
      linkSrc: "/dashboard",
      linkText: <RiHomeLine />,
      text: "Dashboard",
    },
    {
      id: 2,
      linkSrc: "/jobs",
      linkText: <PiBagSimpleFill />,
      text: "Jobs",
    },

    {
      id: 3,
      linkSrc: "/reports",
      linkText: <IoBagOutline />,
      text: "Reports",
    },
    // {
    //   id: 4,
    //   linkSrc: "/dashboard/sub-contractor-list",
    //   linkText: <IoBagOutline />,
    //   text: "Sub Contractor",
    // },
    // {
    //   id: 5,
    //   linkSrc: "/dashboard/suppliers-list",
    //   linkText: <IoBagOutline />,
    //   text: "Suppliers",
    // },
    // {
    //   id: 6,
    //   linkSrc: "/dashboard/adjustors-list",
    //   linkText: <IoBagOutline />,
    //   text: "Adjustor",
    // },
    {
      id: 7,
      linkSrc: "/users-list",
      linkText: <FaRegUser />,
      text: "Users",
    },
    {
      id: 8,
      linkSrc: "/settings",
      linkText: <IoMdSettings />,
      text: "Settings",
    },
  ];

  // Filter the links based on the user role
  const filteredLinks =
    userData?.role?.name === "Super Admin" ||
    userData?.role?.name === "Company" ||
    userData?.role?.name === "Job Admin"
      ? superAdminLinks
      : basicUserLinks;

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
            className={`mainNavLinks ${
              link.id === 11 || link.id === 7 ? "mt-auto" : ""
            }`}
            key={link?.id}
          >
            <NavLink
              to={link?.linkSrc}
              // Add 'end' for dashboard and jobs routes
              // end={link?.linkSrc === "/dashboard" || link?.linkSrc === "/jobs"}
              className="p-2 inline-flex items-center gap-2 border-none text-white fill-slate-100 hover:bg-blue-500 rounded-md w-full"
            >
              {link.linkText}
              <p>{link.text}</p>
            </NavLink>
          </li>
        ))}
        <li>
          <div
            className="p-2 inline-flex items-center gap-2 border-none text-white fill-slate-100 hover:bg-blue-500 rounded-md w-full cursor-pointer"
            onClick={handleLogout}
          >
            <MdOutlineLogout />
            <p>Logout</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
