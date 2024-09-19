import React, { useState, useEffect, useRef } from "react";
import { CheckBox, Form } from "@components/FormControls";
import { CustomerInformation, ProjectSummaryForm } from "@components/Forms";
import SignatureForm from "../SignatureForm";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import COC from "../COC";
import Depreciation from "../Depreciation";
import OverheadProfit from "../OverheadProfit";
import Conclusion from "../Conclusion";
import { Button } from "@components/UI";
import { useFormik } from "formik";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { cocSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Loader } from "@components/UI";
import { useForm } from "react-hook-form";
import { creatCOC, getCoc } from "@services/apiCOC";
import { useAuth } from "@context/AuthContext";
import { HiArrowDownTray } from "react-icons/hi2";

export default function COCForm() {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { name, email, phone } = useSelector(
    (state) => state?.jobs?.singleJobData
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getCoc(id);
      console.log("useform default resp", resp);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    },
  });

  const onSubmit = async function (data) {
    const dataToLoad = { ...data, name, email, phone };
    const resp = await creatCOC(dataToLoad, id);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.message);
    }
    console.log("COC SUbmit resp", resp);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-lg text-stone-500">COC Form</span>
        <Button className="!font-xs self-end text-sm" variant="gradient">
          Download COC form{" "}
          <span>
            <HiArrowDownTray />
          </span>
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-50 rounded-3xl px-4 py-5"
      >
        <CustomerInformation register={register} />
        <COC register={register} />
        <Depreciation register={register} />
        <OverheadProfit />
        <ProjectSummaryForm register={register} />
        <Conclusion register={register} />
        <SignatureForm register={register} control={control} />
        <div className="flex items-center mb-6">
          <CheckBox
            register={register}
            name="status"
            id="status"
            label="Completed"
          />
        </div>
        <div className="flex justify-end">
          <Button className="text-black mr-4 px-4 py-1">Cancel</Button>
          <Button type="submit" variant="gradient">
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"28px"} height={"28px"} color="#fff" />
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
