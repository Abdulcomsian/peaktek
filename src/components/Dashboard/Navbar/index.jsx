import { Link } from "react-router-dom";

import "./nav.css";
import ProfileAvatar from "@components/ProfileAvatar";
import { useSelector } from "react-redux";
import { Input } from "@components/FormControls";
import { useAuth } from "@context/AuthContext";
import { CgSearch } from "react-icons/cg";

export default function NavBar({ onCloseSidebar }) {
  const { user } = useAuth();
  // console.log("USER", user);
  return (
    <nav className="dashboard-nav">
      <div className="welcome-box items-center justify-between !w-full pr-3">
        <button className="btn btn-icon-close " onClick={onCloseSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list "
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <div className="relative w-1/2">
          <CgSearch className="absolute top-1/2 left-1.5 -translate-y-1/2 text-[rgb(44_128_186)]" />
          <Input
            type="search"
            placeholder="Search here..."
            inputClass="!p-3 !pl-7 "
            className="!w-full"
          />
        </div>
        <div className="ml-auto">
          <span className="font-bold text-[rgb(44_128_186)] text-lg leading-3">
            {user?.name}
          </span>
          <p className="text-sm text-end capitalize">{user?.role?.name}</p>
        </div>
        {/* <ProfileAvatar /> */}
      </div>
    </nav>
  );
}
