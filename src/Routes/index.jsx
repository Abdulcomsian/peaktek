import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPasswordForm,
  VerifyEmail,
} from "@components/Authentication";
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
  CompletedJobs,
} from "@pages";

import AppLayout from "@components/Layout";
import {
  Title,
  Introduction,
  Authorization,
  PaymentSchedule,
  RoofComponentsGeneric,
  InsuranceReport,
  TermsAndConditions,
  QuoteDetails,
} from "@components/Forms";
import {
  DesignMeeting,
  Summary,
  CustomerAgreementForm,
  AdjustorMeeting,
  Overturn,
  ReadyToBuild,
  Complete,
} from "@components/JobDetails";
import { KanbanBoard } from "@components/Dashboard";
import { UserList } from "@components";
import { ManageUser } from "@components/index";
import Dealdetail from "@components/Dealdetail";
import ProtectedRoute from "@components/ProtectedRoute";
import Test from "@pages/Test";
import { JobDetail } from "@pages/index";
export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route element={<AppLayout />}>
          <Route path="/test" element={<Test />} />
          <Route
            path="/customer-agreement/:id"
            element={<CustomerAgreement />}
          />
          <Route path="/material-order/:id" element={<MaterialOrder />} />
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
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="jobs" />} />
          <Route path="jobs" element={<KanbanBoard />} />
          <Route path="completedTasks" element={<CompletedJobs />} />
          <Route path="users" element={<UserList />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="deals/:id" element={<Dealdetail />} />
        </Route>
        <Route path="/projects" element={<Projects />}>
          <Route path="title/:id" element={<Title />} />
          <Route path="introduction/:id" element={<Introduction />} />
          {/* <Route path="inspection/:id" element={<Inspection />} /> */}
          <Route path="quote-details" element={<QuoteDetails />} />
          <Route path="authorization" element={<Authorization />} />
          <Route path="payment-schedule" element={<PaymentSchedule />} />
          <Route path="roof-components" element={<RoofComponentsGeneric />} />
          <Route path="insurance-report" element={<InsuranceReport />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        </Route>
        <Route element={<Dashboard />}>
          <Route path="/job-details/:id" element={<JobDetail />}>
            <Route index element={<Navigate to="summary" replace />} />
            <Route path="summary" element={<Summary />} />
            <Route
              path="customer-agreement"
              element={<CustomerAgreementForm />}
            />
            <Route path="adjustor-meeting" element={<AdjustorMeeting />} />
            <Route path="overturn" element={<Overturn />} />
            <Route path="approved" element={<DesignMeeting />} />
            <Route path="ready-to-build" element={<ReadyToBuild />} />
            <Route path="complete" element={<Complete />} />
          </Route>
        </Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
