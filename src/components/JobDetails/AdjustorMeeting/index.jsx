import React, { Fragment, useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { adjustorMeetingSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Ckeditor, FileUploader, Form } from "@components/FormControls";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { AdjustorForm } from "@components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { CheckBox } from "@components/FormControls";
import {
  ArrowFileIcon,
  Button,
  ImageIcon,
  Loader,
  RadioButton,
  RenameFileUI,
} from "@components/UI";
import { useAuth } from "@context/AuthContext";
import {
  getAdjustorMeeting,
  updateAdjustorMeetingStatus,
} from "@services/apiAdjustorMeeting";
import { useForm } from "react-hook-form";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { UploaderInputs } from "@components/index";

const AdjustorMeeting = () => {
  const { id: jobId } = useParams();
  const [showRenameBox, setShowRenameBox] = useState(false);
  const [status, setStatus] = useState("Overturn");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({ defaultValues: getAdjustorMeetingData });

  async function getAdjustorMeetingData() {
    const resp = await getAdjustorMeeting(jobId);
    // console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data.data;
    }
  }

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format the phone number
    const formatted = digits.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");

    // Return formatted value, or the original if it doesn't match the desired length
    return formatted;
  };

  const onSubmit = function (data) {
    console.log(data);
    const { images, documents } = data;
    const formData = new FormData();
    // images.forEach((file) => {
    //   formData.append("images[]", file.file);
    // });
    // documents.forEach((file) => {
    //   formData.append("attachments[]", file.file);
    // });

    // console.log(
    //   "FORM DATA ENTRIES",
    //   images,
    //   documents,
    //   Object.fromEntries(formData)
    // );

    // formData.append("name", values.name);
    // formData.append("email", values.email);
    // formData.append("phone", formatPhone);
    // formData.append("date", formattedDate);
    // formData.append("notes", notes);
    // formData.append("status", status);
    // formData.append("completed", Number(values.completed));
  };
  const onError = function (error) {
    console.log(error);
  };

  return (
    <Fragment>
      {/* {loading && <Spin fullscreen={true} delay={0} />} */}
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2  mb-4 md:mb-0">
              <CheckBox
                label="SENT"
                register={register}
                name="completed"
                id="completed"
              />
            </div>
            <div>
              <RadioButton
                items={[
                  { label: "OVERTURN", value: "Overturn" },
                  { label: "APPRAISAL", value: "Appraisal" },
                  { label: "APPROVED", value: "Approved" },
                ]}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
            </div>
          </div>

          <AdjustorForm
            className="mb-8"
            register={register}
            control={control}
          />

          <div className="flex flex-col md:flex-row">
            <CkeditorControlled control={control} name="notes" id="notes" />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:mr-4">
              <UploaderInputs
                text="Images:"
                name="images"
                id="images"
                register={register}
                icon={<ImageIcon />}
                require={false}
                fileTypes={[
                  "image/png",
                  "image/jpeg",
                  "image/jpg",
                  "image/gif",
                ]}
                // error={
                //   errors.secondary_image &&
                //   formateErrorName(errors?.secondary_image?.message)
                // }
              />
              {/* {showRenameBox &&
                adjustorMeetingData?.images?.map((file) => (
                  <RenameFileUI
                    files={adjustorMeetingData.images}
                    apiDeleteFileEndpoint="/api/delete/adjustor-meeting/media"
                    apiUpdateFileEndPoint="/api/change/adjustor-meeting/file-name"
                  />
                ))} */}
            </div>
            <div className="w-full mr-4">
              <UploaderInputs
                text="Documents:"
                name="documents"
                id="documents"
                register={register}
                icon={<ArrowFileIcon />}
                require={false}
                fileTypes={["application/pdf"]}
              />

              {/* {showRenameBox &&
                adjustorMeetingData?.attachments?.map((file) => (
                  <RenameFileUI
                    files={adjustorMeetingData.attachments}
                    apiDeleteFileEndpoint="/api/delete/adjustor-meeting/media"
                    apiUpdateFileEndPoint="/api/change/adjustor-meeting/file-name"
                  />
                ))} */}
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button variant="primary">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} variant="gradient">
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <Loader width={"24px"} height={"24px"} color="#fff" />
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
