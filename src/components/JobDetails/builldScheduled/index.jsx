import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Form, SelectBox } from "@components/FormControls";
import {
  BuildScheduledForm,
  CustomerInformation,
  DeliveryInformation,
} from "@components/Forms";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchSingleJob } from "@store/slices/JobsSlice";
// import AddMaterialForm from "./AddMaterialForm";
import { schedulingSchema } from "@services/schema";
import Button from "@components/JobDetails/Button";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Spin } from "antd";
import { Loader } from "@components/UI";
import { InputContainer } from "@components";
import { fetchSupplierData } from "@store/slices/suppliersSlice";
import SubTabs from "./components/tabs";
import { useForm } from "react-hook-form";
import { buildScheduled } from "@services/apiBuildScheduled";

const BuildScheduledTab = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isCreating, setIsCreating] = useState(false);
  const path = location.pathname.split("/").pop();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.build_time) {
      const formattedTime = dayjs(data.build_time, ["h:mm A", "HH:mm"]).format(
        "h:mm A"
      );
      data.build_time = formattedTime;
    }

    try {
      setIsCreating(true);
      const response = await buildScheduled(data, id);

      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response.message);
        reset();
      } else if (response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/");
      } else if (response?.status === 422) {
        // Display validation errors from the response
        toast.error(response.data.errors.build_time[0]);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl w-full max-w-7xl">
      {loading && <Spin fullscreen={true} />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div class="flex items-center mb-2 ">
            <label for="checkbox1" class="text-gray-900 mr-2">
              Build Confirmed (Contractor/Homeowner):
            </label>

            <input
              type="checkbox"
              id="checkbox1"
              class="w-4 h-4 text-green-600 bg-green-400 border-green-300 rounded focus:ring-green-400 focus:ring-1"
            />
          </div>
        </div>
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Build Details
        </h2>
        <BuildScheduledForm
          register={register}
          errors={errors}
          setValue={setValue}
          control={control}
        />
        <div className="flex justify-end mr-4">
          <button
            disabled={isCreating}
            type="submit"
            className="w-full max-w-24 text-white btn-gradient px-4 py-1 rounded-sm"
          >
            Submit
          </button>
        </div>
      </Form>
      <SubTabs className="mb-4" currentPath={path} />
    </div>
  );
};

export default BuildScheduledTab;
