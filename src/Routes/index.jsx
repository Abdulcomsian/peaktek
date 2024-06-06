import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../authentication/login";
import RegisterPage from "../authentication/register";
import MainBoardLayout from "../Boards/MainBoard/MainBoardLayout";
import KanbanBoard from "../Boards/MainBoard/Kanban";
import AppLayout from "../components/Layout";
import CustomerAgreementPage from "../pages/CustomerAgreement";
import MaterialOrderPage from "../pages/MaterialOrder";
import WarrantyInformationPage from "../pages/WarrantyInformation";
import CommissionAgreementPage from "../pages/CommisionAgreement";
import AddMaterialPage from "../pages/AddMaterial";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AppLayout />}>
          <Route
            path="/customer-agreement"
            element={<CustomerAgreementPage />}
          />
          <Route path="/material-order" element={<MaterialOrderPage />} />
          <Route
            path="/warranty-information"
            element={<WarrantyInformationPage />}
          />
          <Route
            path="/commission-agreement"
            element={<CommissionAgreementPage />}
          />
          <Route path="/add-material" element={<AddMaterialPage />} />
        </Route>
        <Route path="/" element={<MainBoardLayout />}>
          {/* {/* <Route index element={<Navigate replace to="jobs" />} /> */}
          {/* <Route path="/jobs" element={<KanbanBoard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
