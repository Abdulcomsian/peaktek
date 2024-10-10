import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Form, CheckBox } from "@components/FormControls";
import toast from "react-hot-toast";
import { Button, Loader } from "@components/UI";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import {
  moConfirmationEmail,
  updateEmailSentStatus,
} from "@services/apiBuildScheduled";
import { getConfirmationEmailStatus } from "@services/apiMaterialOrder";

const MOConfimationForm = ({ isMaterialOrderForm }) => {
  const { id } = useParams();
  const [settingStatus, setSettingStatus] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    async function fetchEmailSentStatus() {
      const resp = await getConfirmationEmailStatus(id);
      if (resp.status >= 200 && resp.status < 300) {
        // setSettingStatus(resp.data.status)
        setValue("sent_email", resp.data.status === "true");
      }
    }
    fetchEmailSentStatus();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        email_body: data.email_body,
        send_to: data.send_to,
        subject: data.subject,
        staus: `${data.sent_email}`,
      };

      const response = await moConfirmationEmail(formattedData, id);
      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Email sent successfully.");
        dispatch(setActiveTab("approved"));
        navigate(`/job-details/${jobId}/approved`);
      } else if (response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/");
      } else if (response?.status === 422) {
        toast.error(response.message || "Validation error");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEmailsentStatus = async function (e) {
    const isSent = e.target.checked;
    const formData = new FormData();
    formData.append("status", isSent);

    setSettingStatus(true);
    const resp = await updateEmailSentStatus(formData, id);
    try {
      if (resp.status >= 200 && resp.status < 300) {
      }
    } finally {
      setSettingStatus(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <Input
            label="Send To:"
            placeholder="If more then two, please use comma in between emails."
            className="md:mr-4 mb-4 md:mb-0 max-w-[50%]"
            name="send_to"
            id="send_to"
            register={register}
          />
          <div className="flex items-center gap-3">
            {settingStatus && (
              <Loader width={"24px"} height={"24px"} color="#000" />
            )}
            <CheckBox
              name="sent_email"
              id="sent_email"
              label="Email sent:"
              register={register}
              onChange={handleEmailsentStatus}
            />
          </div>
        </div>
        <Input
          label="Subject:"
          placeholder="Subject"
          className="md:mr-4 mb-4"
          name="subject"
          id="subject"
          register={register}
        />
        <CkeditorControlled
          label="Email body:"
          control={control}
          name="email_body"
          id="email_body"
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="gradient"
          className="mt-4"
        >
          {isSubmitting ? (
            <Loader width={"24px"} height={"24px"} color="#fff" />
          ) : (
            "Send"
          )}
        </Button>
      </div>
    </form>
  );
};

export default MOConfimationForm;
