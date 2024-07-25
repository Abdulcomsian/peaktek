import React, { useMemo } from "react";
import {
  Summary,
  CustomerAgreementForm,
  AdjustorMeeting,
  DesignMeeting,
  Overturn,
} from "@components/JobDetails";

const MobileContent = ({ path }) => {
  const memoizedContent = useMemo(() => {
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
  }, [path]);

  return memoizedContent;
};

export default MobileContent;
