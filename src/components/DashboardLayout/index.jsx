import { useState } from "react";
import { NavBar, Sidebar, KanbanBoard } from "@components/Dashboard";

import "./main.css";
import { Outlet } from "react-router-dom";
import MainContentWrapper from "./MainContentWrapper";

export default function Dashboard() {
  const [isShowNav, setIsShowNav] = useState(false);
  const handleCloseSideBar = function () {
    setIsShowNav((is) => !is);
  };
  return (
    <main className="dashboard-layout-wrapper">
      <Sidebar isShow={isShowNav} onCloseSidebar={handleCloseSideBar}></Sidebar>
      <NavBar onCloseSidebar={handleCloseSideBar} />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </main>
  );
}
