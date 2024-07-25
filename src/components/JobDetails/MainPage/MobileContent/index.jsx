import React from "react";
import {
  Summary,
  CustomerAgreementForm,
  AdjustorMeeting,
  DesignMeeting,
  Overturn,
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
      return <Overturn />;
    case "approved":
      return <DesignMeeting />;
    default:
      return null;
  }
};

export default MobileContent;
