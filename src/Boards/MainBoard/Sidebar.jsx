import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from "../../components/Button";

export default function Sidebar({ isShow, onCloseSidebar }) {
  return (
    <div
      className="dashboard-sidebar"
      style={isShow ? { transform: "translateX(0)" } : {}}
    >
      <Button className="btn-mob-nav-close" onClick={onCloseSidebar}>
        &times;
      </Button>
      <div className="sidebar-logo">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="svg-navigation-roofr-logo"
        >
          <rect
            width="32"
            height="32"
            rx="10"
            ry="10"
            fill="url(#paint0_linear_6426_15354)"
          ></rect>
          <path
            d="M16.0144 9.91394C16.0479 9.95187 19.1829 13.0691 19.4328 13.319L19.4552 13.3324V11.9802H18.9777V11.1122H23.7327V11.9735H23.2686L23.2552 11.9869C23.2552 13.6976 23.2552 15.4083 23.2552 17.119C24.9086 18.7613 26.542 20.4281 28.2177 22.0481C28.2177 22.0481 28.2177 22.0615 28.2177 22.0637C28.2177 22.0637 28.2177 22.066 28.2177 22.0637H19.6604L16.0144 18.44L12.3706 22.0905H3.79321C4.06544 21.8183 15.9943 9.94295 16.0211 9.92063"
            fill="white"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_6426_15354"
              x1="32"
              y1="-1.95533e-06"
              x2="-5.56942"
              y2="9.16188"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#4E73D1"></stop>
              <stop offset="1" stop-color="#269BD6"></stop>
            </linearGradient>
          </defs>
        </svg>
        <Dropdown className="auth-dropdown">
          <Dropdown.Toggle
            id="dropdown-basic"
            className="auth-dropdown-toggler"
          >
            <div>
              <span>PeakTech Roofing</span>
              <p className="text-sm text-gray-500">admin@email.company</p>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="auth-dropdown-menu">
            <Dropdown.Item href="#/action-1">User Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ul className="links sidebar-links">
        <li className="list-item">
          <NavLink to="#" className="link">
            <span>Jobs</span>
          </NavLink>
        </li>
        <li class="list-item">
          <NavLink to="/" className="link">
            <span>Measurment</span>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/" className="link">
            <span>Proposals</span>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/" className="link">
            <span>Invoices</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
