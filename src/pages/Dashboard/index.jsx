import { useState } from "react";
import { NavBar, Sidebar } from "@components/Dashboard";

import "./main.css";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [isShowNav, setIsShowNav] = useState(false);

  const handleCloseSideBar = function () {
    setIsShowNav((is) => !is);
  };
  return (
    <main className="dashboard-layout-wrapper">
      <Sidebar isShow={isShowNav} onCloseSidebar={handleCloseSideBar} />
      <NavBar onCloseSidebar={handleCloseSideBar} />
      <main className="dashboard-main-content bg-[#efefef]">
        <Outlet />
      </main>
    </main>
  );
}
