import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/register";
import MainBoardLayout from "./Boards/MainBoard/MainBoardLayout";
import Kanban from "./Boards/MainBoard/Kanban";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<MainBoardLayout />}>
          <Route path="jobs" element={<Kanban />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
