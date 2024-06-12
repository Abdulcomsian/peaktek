import { useState } from "react";
import { NavBar, Sidebar, KanbanBoard } from "@components/Dashboard";

import "./main.css";

export default function Dashboard() {
  const [isShowNav, setIsShowNav] = useState(false);

  const handleCloseSideBar = function () {
    console.log("hi");
    setIsShowNav((is) => !is);
  };
  return (
    <main className="dashboard-layout-wrapper">
      <Sidebar isShow={isShowNav} onCloseSidebar={handleCloseSideBar} />
      <NavBar onCloseSidebar={handleCloseSideBar} />
      <main className="dashboard-main-content">
        {/* <Outlet /> */}
        <KanbanBoard />
      </main>
    </main>
  );
}
