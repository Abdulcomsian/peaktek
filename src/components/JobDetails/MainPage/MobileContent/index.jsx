import React from "react";
import { Summary, CustomerAgreementForm } from "@components/JobDetails";

const MobileContent = ({ path }) => {
  switch (path) {
    case "summary":
      return <Summary />;
    case "customer-agreement":
      return <CustomerAgreementForm />;
    case "adjustor-meeting":
      return <div>Adjustor Meeting Content</div>;
    case "overturn":
      return <div>Overturn Content</div>;
    case "approved":
      return <div>Approved Content</div>;
    default:
      return null;
  }
};

export default MobileContent;
