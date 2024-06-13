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
  Projects,
} from "@pages";
// import MainBoardLayout from "../Boards/MainBoard/MainBoardLayout";
import AppLayout from "@components/Layout";
import Title from "@components/Forms/Title";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterFlow />} />
        <Route path="/projects" element={<Projects />}>
          <Route path="title" element={<Title />} />
          <Route path="introduction" element={<div>Introduction Form</div>} />
          <Route path="inspection" element={<div>Inspection Form</div>} />
        </Route>
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
          <Route path="/comission" element={<Commission />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
