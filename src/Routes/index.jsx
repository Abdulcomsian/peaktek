import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, RegisterFlow } from "@components/Authentication";
import {
  CertificateOfCompletion,
  CommissionAgreement,
  CustomerAgreement,
  WarrantyInformation,
  MaterialOrder,
  Dashboard,
  Commission,
  CommissionContractor,
  ContractPaySheet,
} from "@pages";

import AppLayout from "@components/Layout";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterFlow />} />

        <Route element={<AppLayout />}>
          <Route path="/customer-agreement" element={<CustomerAgreement />} />
          <Route path="/material-order" element={<MaterialOrder />} />

          <Route
            path="/warranty-information"
            element={<WarrantyInformation />}
          />
          <Route
            path="/commission-agreement"
            element={<CommissionAgreement />}
          />
          <Route
            path="/certificate-of-completion"
            element={<CertificateOfCompletion />}
          />
          <Route path="/commission" element={<Commission />} />
          <Route
            path="/commission-contractor"
            element={<CommissionContractor />}
          />
          <Route path="/contractor-pay-sheet" element={<ContractPaySheet />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
