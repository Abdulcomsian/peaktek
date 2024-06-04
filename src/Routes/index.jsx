import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../authentication/Login";
import Register from "../authentication/register";
import MainBoardLayout from "../Boards/MainBoard/MainBoardLayout";
import KanbanBoard from "../Boards/MainBoard/Kanban";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<MainBoardLayout />}>
          <Route index element={<Navigate to="jobs" />} />
          <Route path="jobs" element={<KanbanBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
