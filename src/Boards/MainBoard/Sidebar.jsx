import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">SIDEBAR</div>
      <ul className="sidebar-links">
        <li className="link">
          <Link>Jobs</Link>
        </li>
      </ul>
    </aside>
  );
}
