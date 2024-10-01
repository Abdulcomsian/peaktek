import React, { Fragment, useState, useEffect } from "react";
import { CheckBox, Input } from "@components/FormControls";
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
  const { id } = useParams();
  const [currTab, setCurrTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    defaultValues: async () => {
      const resp = await getCoc(id);
      if (resp.status >= 200 && resp.status < 300) {
        setPdfUrl(resp.data.pdf_url); // Store PDF URL
        return resp.data;
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    },
  });

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <div className={`flex items-center gap-2`}>
        {/* <label htmlFor="status" className="font-semibold uppercase">
          coc complete
        </label>
        <input
          type="checkbox"
          className="h-6 w-6 border border-gray-300 bg-gray-50"
          onChange={(e) => handleChange(e)}
        /> */}
        <CheckBox
          label="COC complete"
          id="status"
          name="status"
          register={register}
          wrapperClassName="flex items-center justify-end gap-2 col-span-2"
        />
      </div>
      <div className="bg-white p-5 rounded-2xl">
        {/* <CheckBox
          label="COC complete"
          id="status"
          name="status"
          register={register}
          wrapperClassName="flex items-center justify-end gap-2 col-span-2"
        /> */}

        <InsuranceInfo />
        <TabsContentBox>
          <div>
            <Tabs
              items={tabsDesignMeeting}
              activeTab={currTab}
              onClick={setCurrTab}
            />
            {currTab === 1 && (
              <COCForm
                register={register}
                control={control}
                getValues={getValues}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                pdfUrl={pdfUrl}
              />
            )}
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
