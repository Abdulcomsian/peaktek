import React, { useState, useEffect, useRef } from "react";
import { Form } from "@components/FormControls";
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
import { getCOC } from "@services/apiCOC";
import { useAuth } from "@context/AuthContext";

export default function COCForm() {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getCOC(id);
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

  const onSubmit = function (data) {
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <Button className="!font-xs self-end" variant="gradient">
        Download COC form
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerInformation register={register} />
        <COC register={register} />
        <Depreciation register={register} />
        <OverheadProfit />
        <ProjectSummaryForm register={register} />
        <Conclusion />
        <SignatureForm register={register} control={control} />
        <div className="flex items-center mb-6">
          <input
            id="complete"
            type="checkbox"
            className="w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="complete"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Complete
          </label>
        </div>
        <div className="flex">
          <Button className="text-black mr-4 px-4 py-1">Cancel</Button>
          <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
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
