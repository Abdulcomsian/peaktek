import React, { Fragment, useState, useEffect } from "react";
import { Input } from "@components/FormControls";
import { COCInsuranceForm } from "@components/Forms";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import TabsContentBox from "@components/UI/TabsContentBox";
import { Tabs } from "@components/UI";
import COCForm from "./COCForm";
import { getCoc } from "@services/apiCOC";
import InsuranceInfo from "./InsuranceInfo";

const tabsDesignMeeting = [
  { id: 1, title: "COC FORM" },
  { id: 2, title: "COC INSURANCE EMAIL" },
];

const Complete = () => {
  const [currTab, setCurrTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        COC
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <InsuranceInfo />
        <TabsContentBox>
          <div>
            <Tabs
              items={tabsDesignMeeting}
              activeTab={currTab}
              onClick={setCurrTab}
            />
            {currTab === 1 && <COCForm />}
            {currTab === 2 && <COCInsuranceForm />}
          </div>
          {/* <div className="md:hidden">
            <Tabs
              items={tabsDesignMeeting}
              collapsable={true}
              onClick={setCurrTab}
              activeTab={currTab}
            />
          </div> */}
        </TabsContentBox>
      </div>
    </Fragment>
  );
};

export default Complete;
