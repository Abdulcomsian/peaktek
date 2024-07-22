import { Tabs } from "@components/UI";
import { FileIcon, GalleryIcon, TextIcon } from "@components/UI";
import { useState } from "react";

const tabsDesignMeeting = [
  { title: "Carrer Scope" },
  { title: "Title" },
  { title: "Introduction" },
  { title: "Inseption" },
  { title: "Quote Detail" },
  { title: "Authorization" },
  { title: "Payment Schedule" },
  { title: "Roof Component" },
  { title: "Xactimate Report" },
  { title: "Terms and Condition" },
];

const DesignMeeting = () => {
  const [currTab, setCurrTab] = useState(1);
  return (
    <section>
      <Tabs items={tabsDesignMeeting} onClick={setCurrTab} />
    </section>
  );
};

export default DesignMeeting;
