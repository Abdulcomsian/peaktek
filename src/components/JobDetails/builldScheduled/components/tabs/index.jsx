import { Tabs } from "@components/UI";
import { FileIcon, GalleryIcon, TextIcon } from "@components/UI";
import TabsContentBox from "@components/UI/TabsContentBox";
import { useState } from "react";
import {
  CustomerInformation,
  CustomerInformationForm,
  MoInformationEmail,
} from "@components/Forms";
import MOForm from "../MOForm";
import MOConfimationForm from "@components/Forms/MOConfirmationEmail";
import { useForm } from "react-hook-form";

const tabsDesignMeeting = [
  { id: 1, title: "Confirmation Email" },
  { id: 2, title: "Material Order Form" },
  { id: 3, title: "MO confirmation email" },
];

function renderSection(currTab) {
  switch (currTab) {
    case 1:
      return <MOConfimationForm />;
    case 2:
      return <MOForm />;
    case 3:
      return <MoInformationEmail />;
  }
}

const Subtabs = () => {
  const [currTab, setCurrTab] = useState(1);
  return (
    <TabsContentBox>
      <div className="hidden md:block p-4">
        <Tabs
          items={tabsDesignMeeting}
          activeTab={currTab}
          onClick={setCurrTab}
        />
        {renderSection(currTab)}
      </div>
      <div className="md:hidden">
        <Tabs
          items={tabsDesignMeeting}
          collapsable={true}
          onClick={setCurrTab}
          activeTab={currTab}
        />
      </div>
    </TabsContentBox>
  );
};

export default Subtabs;
