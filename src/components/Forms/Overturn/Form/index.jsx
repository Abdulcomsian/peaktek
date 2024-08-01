import { InputContainer } from "@components";
import {
  CustomTimePicker,
  DateSelector,
  Form,
  TextBox,
} from "@components/FormControls";
import React from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { overturnMeetingSchema } from "@services/schema";
import { useParams } from "react-router-dom";
import Button from "@components/JobDetails/Button";
const OverturnForm = () => {
  const { id } = useParams();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      time: null,
      date: null,
    },
    validationSchema: overturnMeetingSchema,
    onSubmit: async (values, actions) => {
      // Format time with leading zero for single-digit hours and include AM/PM
      const formattedTime = values.time
        ? dayjs(values.time).format("hh:mm A")
        : "Invalid Time";

      // Format date to 'DD/MM/YYYY'
      const formattedDate = dayjs(values.date).format("DD/MM/YYYY");

      // Prepare the data to send to the server
      const formattedValues = {
        ...values,
        time: formattedTime,
        date: formattedDate,
      };
      console.log("Formated values", formattedValues);
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createOverturn}/${id}`,
          formattedValues,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
          actions.resetForm();
        }
      } catch (error) {
        if (error?.response) {
          toast.error(
            error?.response?.data?.error || error?.response?.data?.message
          );
        }
      }
    },
  });
  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          className="md:mr-4  mb-4 md:mb-0"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />
        <CustomTimePicker
          label="Select a Time"
          value={values.time}
          name="time"
          onBlur={handleBlur}
          onChange={(timeString) => setFieldValue("time", timeString)}
          error={errors.time}
          touched={touched.time}
          className="mb-4 md:mb-0 md:mr-4"
        />
        <DateSelector
          label="Select Date"
          className="mb-4 md:mb-0 "
          name="date"
          value={values.date}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("date", dateString)}
          error={errors.date}
          touched={touched.date}
        />
      </InputContainer>
      <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
        Submit
      </Button>
    </Form>
  );
};

export default OverturnForm;
