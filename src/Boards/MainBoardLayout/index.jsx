import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";

export default function MainAppBoardLayout({ children }) {
  return (
    <main className="main-board-wrapper">
      <Sidebar />
      <Navbar />
      <MainContentBox>
        <Outlet />
      </MainContentBox>
    </main>
  );
}
