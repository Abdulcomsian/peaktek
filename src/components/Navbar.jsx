import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="auth-navbar">
      <div className="logo">LOGO</div>
      <ul className="nav-links">
        <li className="nav-links-item">
          <Link>Contact us</Link>
        </li>
        <li className="nav-links-item">
          <Link to="/register" className="btn btn--primary-lighter">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
