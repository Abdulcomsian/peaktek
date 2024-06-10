import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@components/Authentication/Login";

import MainBoardLayout from "../Boards/MainBoard/MainBoardLayout";
import AppLayout from "../components/Layout";
import CustomerAgreementPage from "../pages/CustomerAgreement";
import MaterialOrderPage from "../pages/MaterialOrder";
import WarrantyInformationPage from "../pages/WarrantyInformation";
import CommissionAgreementPage from "../pages/CommisionAgreement";
import RegisterFlow from "@components/Authentication/RegistrationFlow";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterFlow />} />

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
