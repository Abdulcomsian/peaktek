import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import MainBoardLayout from "../Boards/MainBoard/MainBoardLayout";
import AppLayout from "../components/Layout";
import CustomerAgreementPage from "../pages/CustomerAgreement";
import MaterialOrderPage from "../pages/MaterialOrder";
import WarrantyInformationPage from "../pages/WarrantyInformation";
import CommissionAgreementPage from "../pages/CommisionAgreement";
import CreatePassword from "../components/Authentication/CreatePassword";
import VerifyEmail from "../components/Authentication/VerifyEmail";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
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
        </Route>
        <Route path="/dashboard" element={<MainBoardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
