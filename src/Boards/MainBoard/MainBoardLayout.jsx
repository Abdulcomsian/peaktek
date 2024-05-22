import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

import "./main.css";

export default function MainBoardLayout() {
  return (
    <main className="main-board-wrapper">
      <Sidebar />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </main>
  );
}
