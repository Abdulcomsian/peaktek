import { Tabs } from "@components/UI";
import { FileIcon, GalleryIcon, TextIcon } from "@components/UI";
import TabsContentBox from "@components/UI/Tabs/TabsContentBox";
import { useState } from "react";
import {
  AuthorizationForm,
  InspectionForm,
  IntroductionForm,
  QuoteDetailsForm,
  Title,
  TitleForm,
} from "@components/Forms";

const tabsDesignMeeting = [
  { id: 1, title: "Carrer Scope" },
  { id: 2, title: "Title" },
  { id: 3, title: "Introduction" },
  { id: 4, title: "Inseption" },
  { id: 5, title: "Quote Detail" },
  { id: 6, title: "Authorization" },
  { id: 7, title: "Payment Schedule" },
  { id: 8, title: "Roof Component" },
  { id: 9, title: "Xactimate Report" },
  { id: 10, title: "Terms and Condition" },
];

function renderSection(currTab) {
  switch (currTab) {
    case 2:
      return <TitleForm />;
    case 3:
      return <IntroductionForm />;
    case 4:
      return <InspectionForm />;
    case 5:
      return <QuoteDetailsForm />;
    case 6:
      return <AuthorizationForm />;
  }
}

const DesignMeeting = () => {
  const [currTab, setCurrTab] = useState(1);
  return (
    <>
      <TabsContentBox contentTitle="Design Meeting">
        <Tabs
          items={tabsDesignMeeting}
          activeTab={currTab}
          onClick={setCurrTab}
        />
        {renderSection(currTab)}
      </TabsContentBox>
    </>
  );
};

export default DesignMeeting;
