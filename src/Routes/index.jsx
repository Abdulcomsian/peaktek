import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../authentication/Login";
import RegisterPage from "../authentication/Register";
import MainBoardLayout from "../Boards/MainBoard/MainBoardLayout";

import AppLayout from "../components/Layout";
import CustomerAgreementPage from "../pages/CustomerAgreement";
import MaterialOrderPage from "../pages/MaterialOrder";
import WarrantyInformationPage from "../pages/WarrantyInformation";
import CommissionAgreementPage from "../pages/CommisionAgreement";
import CreatePassword from "../authentication/CreatePassword";
import VerifyEmail from "../authentication/VerifyEmail";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
        <Route path="/" element={<MainBoardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
