import React, { Fragment, useState } from "react";
import MoneyInput from "./MoneyInput";
import { Tabs } from "@components/UI";
import { FileIcon, GalleryIcon } from "@components/UI";

import TabsContentBox from "@components/UI/Tabs/TabsContentBox";

import Notes from "./Notes";
import Photos from "./Photos";

const items = [
  { id: 1, title: "Notes", icon: <FileIcon className="mr-1" /> },
  { id: 2, title: "Photos", icon: <GalleryIcon className="mr-1" /> },
];

const Summary = () => {
  const [activeTab, setActiveTab] = useState(1);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 1:
        return <Notes />;
      case 2:
        return <Photos />;
      default:
        break;
    }
  };

  return (
    <Fragment>
      {/**First part start*/}
      <div className="bg-white rounded-2xl p-5 w-full max-w-3xl flex flex-col md:flex-row justify-between mb-6">
        <div className="flex justify-between  md:flex-col  font-poppins font-normal text-sm mb-4 md:mb-0">
          <div className="text-black text-opacity-30 mb-4">Job Total</div>
          <div className="text-black">10,000</div>
        </div>
        <div className="flex gap-6 justify-between flex-wrap">
          <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
            <div className="text-black text-opacity-30 mb-4">First Payment</div>
            <MoneyInput label="100" id="first-payment" />
          </div>
          <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
            <div className="text-black text-opacity-30 mb-4">Deductable</div>
            <MoneyInput label="100" id="first-payment" />
          </div>
          <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
            <div className="text-black text-opacity-30 mb-4">Upgrades</div>
            <MoneyInput label="100" id="first-payment" />
          </div>
          <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
            <div className="text-black text-opacity-30 mb-4">Final Payment</div>
            <MoneyInput label="100" id="first-payment" />
          </div>
        </div>

        <div className="flex justify-between md:flex-col  font-poppins font-normal text-sm">
          <div className="text-black mb-4 font-medium">Balance</div>
          <div className="text-black">10,000</div>
        </div>
      </div>
      {/**First part Ends*/}
      <TabsContentBox contentTitle="Job Content">
        <Tabs items={items} activeTab={activeTab} onClick={setActiveTab} />
        <div>{renderActiveTab()}</div>
      </TabsContentBox>
    </Fragment>
  );
};

export default Summary;
