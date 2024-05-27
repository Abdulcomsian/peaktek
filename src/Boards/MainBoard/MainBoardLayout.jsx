import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

import "./main.css";

export default function MainBoardLayout() {
  return (
    <main className="dashboard-layout-wrapperr">
      <Sidebar />
      <NavBar />
      <main className="dashboard-main-content">
        <Outlet />
      </main>
    </main>
  );
}
