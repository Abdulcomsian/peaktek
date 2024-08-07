import { Link } from "react-router-dom";

import "./nav.css";
import ProfileAvatar from "@components/ProfileAvatar";

export default function NavBar({ onCloseSidebar }) {
  return (
    <nav className="dashboard-nav">
      <div className="welcome-box items-center w-full pr-3">
        <button className="btn btn-icon-close" onClick={onCloseSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <div className="mr-auto">
          <ul className="list nav-list justify-between">
            <li>
              <Link>Deals</Link>
            </li>
          </ul>
        </div>
        <ProfileAvatar />
      </div>
    </nav>
  );
}
