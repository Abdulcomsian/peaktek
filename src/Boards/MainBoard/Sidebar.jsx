import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

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
        <Logo className="w-10 h-10" />
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
          <NavLink to="/jobs" className="link">
            <span>Jobs</span>
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink to="" className="link">
            <span>Proposals</span>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="" className="link">
            <span>Invoices</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
