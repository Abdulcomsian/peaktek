import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
  Title,
  Introduction,
  Inspection,
  Authorization,
  PaymentSchedule,
  RoofComponentsGeneric,
  InsuranceReport,
  TermsAndConditions,
} from "@components/Forms";
import { KanbanBoard } from "@components/Dashboard";
import { CompletedJobs } from "@pages/index";
import { UserList } from "@components/index";
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
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="jobs" />} />
          <Route path="jobs" element={<KanbanBoard />} />
          <Route path="completedTasks" element={<CompletedJobs />} />
          <Route path="users" element={<UserList />} />
        </Route>
        <Route path="/projects" element={<Projects />}>
          <Route path="title" element={<Title />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="inspection" element={<Inspection />} />
          <Route path="authorization" element={<Authorization />} />
          <Route path="payment-schedule" element={<PaymentSchedule />} />
          <Route path="roof-components" element={<RoofComponentsGeneric />} />
          <Route path="insurance-report" element={<InsuranceReport />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
