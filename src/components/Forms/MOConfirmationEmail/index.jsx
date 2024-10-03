import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Form, CheckBox } from "@components/FormControls";
import toast from "react-hot-toast";
import { Button } from "@components/UI";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { moConfirmationEmail } from "@services/apiBuildScheduled";

const MOConfimationForm = ({ isMaterialOrderForm }) => {
  const [isCreating, setIsCreating] = useState(false);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      send_to: ["test1@yopmail.com", "test2@yopmail.com"],
      subject: "",
      email_body: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log("Data Format=>", data);

    try {
      setIsCreating(true);

      const formattedData = {
        email_body: data.email_body,
        send_to: [data.send_to],
        subject: data.subject,
      };
      console.log("Formatted Data=>", formattedData);

      const response = await moConfirmationEmail(formattedData, id);
      console.log("response ", response);

      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Email sent successfully.");
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
      toast.error("An unexpected error occurred.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <Input
            label="Send To:"
            type="email"
            placeholder="example@gmail.com"
            className="md:mr-4 mb-4 md:mb-0 max-w-[50%]"
            name="send_to"
            id="send_to"
            register={register}
          />
          <CheckBox
            register={register}
            name="status"
            id="status"
            label="Email sent:"
          />
        </div>
        <Input
          label="Subject:"
          placeholder="Subject"
          className="md:mr-4 mb-4"
          name="subject"
          id="subject"
          register={register}
          control={control}
        />
        <CkeditorControlled
          label="Email body:"
          control={control}
          name="email_body"
          id="email_body"
        />
        <Button
          disabled={isCreating}
          type="submit"
          variant="gradient"
          className="mt-4"
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default MOConfimationForm;
