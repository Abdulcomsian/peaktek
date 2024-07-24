import React from "react";
import {
  Summary,
  CustomerAgreementForm,
  AdjustorMeeting,
  DesignMeeting,
} from "@components/JobDetails";

const MobileContent = ({ path }) => {
  switch (path) {
    case "summary":
      return <Summary />;
    case "customer-agreement":
      return <CustomerAgreementForm />;
    case "adjustor-meeting":
      return <AdjustorMeeting />;
    case "overturn":
      return <div>Overturn Content</div>;
    case "approved":
      return <DesignMeeting />;
    default:
      return null;
  }
};

export default MobileContent;
