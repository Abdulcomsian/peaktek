import React, { Fragment, useState } from "react";
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
  createAdjustorMeeting,
  getAdjustorMeeting,
  updateAdjustorMeetingSentStatus,
  updateAdjustorMeetingStatus,
} from "@services/apiAdjustorMeeting";
import { useForm } from "react-hook-form";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { UploaderInputs } from "@components/index";
import SimpleFileUploader from "@components/FormControls/SimpleFileUploader";
import toast from "react-hot-toast";
import { DesignMeeting } from "..";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@store/slices/activeTabSlice";
const AdjustorMeeting = () => {
  const { id: jobId } = useParams();
  const [showRenameBox, setShowRenameBox] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [status, setStatus] = useState("overturn");
  const [documents, setDocuments] = useState([]);
  const [images, setImages] = useState([]);
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getAdjustorMeeting(jobId);
      console.log("get adjustor meeting resp", resp);
      if (resp.data.status >= 200 && resp.data.status < 300) {
        setShowRenameBox(true);
        setDocuments(resp?.data?.data?.documents);
        setImages(resp?.data?.data?.image_url);
        setStatus(resp?.data?.data?.status);
        return { ...resp?.data?.data, sent: resp?.data?.data?.sent === "true" };
      }
    },
  });
  // const attachments = getValues("documents");
  // const images = getValues("images_url");

  console.log("ssssstatus", status);

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format the phone number
    const formatted = digits.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");

    // Return formatted value, or the original if it doesn't match the desired length
    return formatted;
  };

  const onSubmit = async function (data) {
    const { sent, date, documents, email, images, name, notes, phone } = data;

    const formData = new FormData();
    if (!images[0]?.media_url && images.length > 0) {
      for (let x = 0; x < images.length; x++) {
        formData.append("images[]", images[x]);
      }
    }
    if (!documents[0]?.media_url && documents.length > 0) {
      for (let x = 0; x < documents.length; x++) {
        formData.append("attachments[]", documents[x]);
      }
    }
    if (!date) {
      toast.error("Please enter date");
    }
    formData.append("name", name);
    formData.append("email", email || "");
    formData.append("phone", phone);
    formData.append("date", date !== null ? date : "");
    formData.append("notes", notes ? notes : "");
    formData.append("sent", sent);
    formData.append("status", status);

    try {
      const resp = await createAdjustorMeeting(formData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        const { sent, status } = resp.data.data;
        toast.success(resp.data.message);
        console.log("ADjustor meeting resp", resp);
        if (sent === "true" && status === "approved") {
          dispatch(setActiveTab("ready-to-build"));
          navigate(`/job-details/${jobId}/ready-to-build`);
        }
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    } catch (error) {
      console.log("Error message", error);
    }
  };

  const handleChange = async function (e) {
    console.log(e.target.checked);
    const isSent = e.target.checked;

    const formData = new FormData();
    formData.append("sent", isSent);
    setIsSent(true);
    try {
      const resp = await updateAdjustorMeetingSentStatus(formData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        console.log("asdasd", resp);
        if (resp.data.data.sent === "true") {
          dispatch(setActiveTab("ready-to-build"));
          navigate(`/job-details/${jobId}/ready-to-build`);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSent(false);
    }
  };
  return (
    <Fragment>
      {/* {loading && <Spin fullscreen={true} delay={0} />} */}
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2  mb-4 md:mb-0">
              <CheckBox
                label="SENT"
                register={register}
                name="sent"
                id="sent"
                onChange={handleChange}
                disabled={isSent}
              />
              {isSent && <Loader width={"20px"} height={"20px"} color="#000" />}
            </div>
            <div>
              <RadioButton
                items={[
                  { label: "OVERTURN", value: "overturn" },
                  { label: "APPRAISAL", value: "appraisal" },
                  { label: "APPROVED", value: "approved" },
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
            setValue={setValue}
            errors={errors}
          />

          <div className="flex flex-col md:flex-row">
            <CkeditorControlled control={control} name="notes" id="notes" />
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="w-full md:mr-4">
              <div>
                <SimpleFileUploader
                  label="Images"
                  name="images"
                  id="images"
                  register={register}
                  fileTypes={[
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/gif",
                  ]}
                  multiple={true}
                />
              </div>
              {showRenameBox && (
                <RenameFileUI
                  files={images}
                  apiDeleteFileEndpoint="/api/delete/adjustor-meeting/media"
                  apiUpdateFileEndPoint="/api/change/adjustor-meeting/file-name"
                />
              )}
            </div>
            <div className="w-full mr-4">
              <SimpleFileUploader
                label="Documents"
                name="documents"
                id="documents"
                register={register}
                fileTypes={["application/pdf"]}
                multiple={true}
              />
              {showRenameBox && (
                <RenameFileUI
                  files={documents}
                  apiDeleteFileEndpoint="/api/delete/adjustor-meeting/media"
                  apiUpdateFileEndPoint="/api/change/adjustor-meeting/file-name"
                />
              )}
            </div>
          </div>
          <div className="flex gap-4 mb-5 justify-end">
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
      <div className="bg-stone-50 p-4 rounded-2xl">
        <DesignMeeting />
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
