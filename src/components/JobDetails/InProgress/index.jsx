import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckBox } from "@components/FormControls";
import { Button, Loader } from "@components/UI";
import { useForm } from "react-hook-form";
import { CustomDatePicker } from "@components";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import {
  createQCInspection,
  getQCInspection as getQCInspectionApi,
  updateIPstatus,
} from "@services/apiInProgress";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@store/slices/activeTabSlice";

const InProgress = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBuildingComplete, setIsBuildingComplete] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getQCInspectionApi(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
    },
  });

  const onSubmit = async function (data) {
    const resp = await createQCInspection(data, jobId);

    if (resp.status >= 200 && resp.status < 300) {
      if (resp.data.status) {
        console.log(resp);
        dispatch(setActiveTab("complete"));
        navigate(`/job-details/${jobId}/complete`);
      }
    }
  };
  const handleCheckboxChange = async (e) => {
    const status = e.target.checked;
    setIsBuildingComplete(true);
    try {
      const resp = await updateIPstatus({ status }, jobId); // Assuming this API updates the status
      if (resp.status >= 200 && resp.status < 300) {
        if (resp.data.status) {
          dispatch(setActiveTab("complete"));
          navigate(`/job-details/${jobId}/complete`);
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    } finally {
      setIsBuildingComplete(false);
    }
  };
  return (
    <Fragment>
      <div className="bg-white p-5 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="flex items-center gap-3">
            <CheckBox
              label="Build Complete"
              id="status"
              name="status"
              register={register}
              onChange={handleCheckboxChange}
            />
            {isBuildingComplete && (
              <Loader width="24px" height="24px" color="#000" />
            )}
          </div>
          <div className="flex items-center gap-3 mt-3">
            <CustomDatePicker
              label="Build Start Date:"
              className="mb-4"
              control={control}
              name="build_start_date"
              error={
                errors.date &&
                formateErrorName(errors?.build_start_date?.message)
              }
            />
            <CustomDatePicker
              label="Build End Date:"
              className="mb-4"
              control={control}
              name="build_end_date"
              error={
                errors.date && formateErrorName(errors?.build_end_date?.message)
              }
            />
          </div>
          <CkeditorControlled control={control} name="notes" id="notes" />

          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting}
            className="mt-4"
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default InProgress;
