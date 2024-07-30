import React, { useMemo } from "react";
import {
  Summary,
  CustomerAgreementForm,
  AdjustorMeeting,
  DesignMeeting,
  Overturn,
} from "@components/JobDetails";

const MobileContent = ({ path, key }) => {
  const memoizedContent = useMemo(() => {
    switch (path) {
      case "summary":
        return <Summary key={key} />;
      case "customer-agreement":
        return <CustomerAgreementForm />;
      case "adjustor-meeting":
        return <AdjustorMeeting />;
      case "overturn":
        return <Overturn />;
      case "approved":
        return <DesignMeeting key={key} />;
      default:
        return null;
    }
  }, [path]);

  return memoizedContent;
};

export default MobileContent;
