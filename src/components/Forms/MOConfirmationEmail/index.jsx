import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputContainer } from "@components";
import { Input, Form } from "@components/FormControls";
import { TextareaI } from "@components/index";
import toast from "react-hot-toast";
import {
  confirmationEmail,
  moConfirmationEmail,
} from "@services/apiBuildScheduled";
import { Button } from "@components/UI";

const MOConfimationForm = ({ isMaterialOrderForm }) => {
  const [isCreating, setIsCreating] = useState(false);
  const { id } = useParams();
  const api = isMaterialOrderForm ? moConfirmationEmail : confirmationEmail;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      send_to: [],
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

      const response = await api(formattedData, id);
      console.log("response ", response);

      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Email sent successfully.");
      } else if (response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/");
      } else if (response?.status === 422) {
        toast.error(response.data.errors?.send_to?.[0] || "Validation error");
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <Input
            label="Send To:"
            placeholder="test@test.com"
            className="md:mr-4 mb-4 md:mb-0"
            name="send_to"
            register={register}
            control={control}
          />
          <Input
            label="Subject:"
            placeholder="Subject"
            type="text"
            className="md:mr-4 mb-4 md:mb-0"
            name="subject"
            register={register}
            control={control}
          />
        </InputContainer>
        <TextareaI
          label="Email Body:"
          placeholder="Email body..."
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="email_body"
          register={register}
          control={control}
        />
        <Button
          disabled={isCreating}
          type="submit"
          className="w-full max-w-24 text-white btn-gradient px-4 py-1 rounded-sm mt-4"
        >
          Send
        </Button>
      </div>
    </Form>
  );
};

export default MOConfimationForm;
