import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

import "./main.css";
import { useState } from "react";

export default function MainBoardLayout() {
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
        <Outlet />
      </main>
    </main>
  );
}
