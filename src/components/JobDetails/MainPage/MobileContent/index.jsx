import React, { useMemo } from "react";
import {
  Summary,
  CustomerAgreementForm,
  AdjustorMeeting,
  DesignMeeting,
  Overturn,
  ReadyToBuild,
  Complete,
  InProgress,
  Scheduling,
  EstimatePrepared,
} from "@components/JobDetails";

const MobileContent = ({ path, key }) => {
  const memoizedContent = useMemo(() => {
    switch (path) {
      case "summary":
        return <Summary key={key} />;
      case "customer-agreement":
        return <CustomerAgreementForm />;
      case "estimate-prepared":
        return <EstimatePrepared />;
      case "adjustor-meeting":
        return <AdjustorMeeting />;
      case "overturn":
        return <Overturn />;
      case "approved":
        return <DesignMeeting />;
      case "scheduling":
        return <Scheduling />;
      case "ready-to-build":
        return <ReadyToBuild />;
      case "in-progress":
        return <InProgress />;
      case "complete":
        return <Complete />;
      default:
        return null;
    }
  }, [path]);

  return memoizedContent;
};

export default MobileContent;
