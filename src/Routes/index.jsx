import React from "react";
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
  Projects,
} from "@pages";

import AppLayout from "@components/Layout";
import {
  TitleSidebarForm,
  IntroductionSidebarForm,
  InspectionSidebarForm,
} from "@components/Forms";
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
        <Route path="/projects" element={<Projects />}>
          <Route path="title" element={<TitleSidebarForm />} />
          <Route path="introduction" element={<IntroductionSidebarForm />} />
          <Route path="inspection" element={<InspectionSidebarForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
