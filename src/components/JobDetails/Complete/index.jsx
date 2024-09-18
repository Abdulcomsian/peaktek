import React, { Fragment, useState, useEffect, useRef } from "react";
import { Form, Input } from "@components/FormControls";
import {
  COCInsuranceForm,
  CustomerInformation,
  ProjectSummaryForm,
} from "@components/Forms";
import SignatureForm from "./SignatureForm";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import COC from "./COC";
import Depreciation from "./Depreciation";
import OverheadProfit from "./OverheadProfit";
import Conclusion from "./Conclusion";
import Button from "@components/JobDetails/Button";
import { useFormik } from "formik";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { cocSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { Loader } from "@components/UI";
import { useForm } from "react-hook-form";
import TabsContentBox from "@components/UI/TabsContentBox";
import { Tabs } from "@components/UI";
import {
  AuthorizationForm,
  InspectionForm,
  IntroductionForm,
  PaymentScheduleForm,
  QuoteDetailsForm,
  RoofComponent,
  TermandConditionForm,
  TermsAndConditions,
  Title,
  TitleForm,
} from "@components/Forms";
import CarrierScope from "../CarrierScope";
import COCForm from "./COCForm";

const tabsDesignMeeting = [
  { id: 1, title: "COC FORM" },
  { id: 2, title: "COC INSURANCE EMAIL" },
];

const Complete = () => {
  const [currTab, setCurrTab] = useState(1);
  const { id } = useParams();
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
        <form className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-5">
          <Input register={register} name="name" label="Homeowner Name" />
          <Input
            register={register}
            name="homeowner_email"
            type="email"
            label="Homeowner Email"
          />
          <Input
            register={register}
            name="address"
            label="Address"
            className="col-span-full"
          />
          <Input register={register} name="insurance" label="Insurance" />
          <Input register={register} name="policy" label="Policy #" />
          <Input register={register} name="email" type="email" label="Email" />
          <Input register={register} name="claim_number" label="Claim #" />
        </form>
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
