import React, { useState } from "react";
import { BuildScheduledForm } from "@components/Forms";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Spin } from "antd";
import SubTabs from "./components/tabs";
import { useForm } from "react-hook-form";
import { buildScheduled, getBuildSchedule } from "@services/apiBuildScheduled";
import { ThreeDots } from "react-loader-spinner";
import { Button, Loader } from "@components/UI";

const BuildScheduledTab = () => {
  const { id: jobId } = useParams();
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
    watch,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getBuildSchedule(jobId);
      console.log("Buil schedule", resp);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
    },
  });

  const onSubmit = async (data) => {
    if (data.build_time) {
      const formattedTime = dayjs(data.build_time, ["hh:mm A", "HH:mm"]).format(
        "hh:mm A"
      );
      data.build_time = formattedTime;
    }

    try {
      setIsCreating(true);
      const response = await buildScheduled(
        { ...data, confirmed: `${data.confirmed}` },
        jobId
      );

      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response.message);
        // if (response.data.status) {
        //   dispatch(setActiveTab("ready-to-close"));
        //   navigate(`/job-details/${jobId}/ready-to-close`);
        // }
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

  if (isLoading)
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#18faf8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="flex item-center justify-center"
      />
    );

  return (
    <div className="bg-white p-5 rounded-2xl w-full max-w-7xl">
      {loading && <Spin fullscreen={true} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <BuildScheduledForm
          register={register}
          errors={errors}
          control={control}
        />
        <div className="flex justify-end mr-4">
          <Button disabled={isCreating} type="submit" variant="gradient">
            {isSubmitting ? (
              <Loader width={"24px"} height={"24px"} color="#fff" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
      <SubTabs className="mb-4" currentPath={path} />
    </div>
  );
};

export default BuildScheduledTab;
