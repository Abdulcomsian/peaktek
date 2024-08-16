import React, { useEffect } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { overturnMeetingSchema } from "@services/schema";
import {
  CustomTimePicker,
  DateSelector,
  Form,
  TextBox,
} from "@components/FormControls";
import { InputContainer } from "@components";
import Button from "@components/JobDetails/Button";
import { Loader } from "@components/UI";

const OverturnForm = ({ id, data, refreshData }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      time: "",
      date: "",
    },
    enableReinitialize: true,
    validationSchema: overturnMeetingSchema,
    onSubmit: async (values, actions) => {
      const formattedTime = values.time
        ? dayjs(values.time).format("hh:mm A")
        : "Invalid Time";

      const formattedDate = dayjs(values.date).format("DD/MM/YYYY");

      const formattedValues = {
        ...values,
        time: formattedTime,
        date: formattedDate,
      };

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
          // actions.resetForm();
          if (refreshData) {
            refreshData(); // Trigger the data refresh in overtrun form
          }
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

  useEffect(() => {
    if (data) {
      const formattedInitialDate = data?.date
        ? dayjs(data?.date, "DD/MM/YYYY")
        : null;

      const formattedInitialTime = data?.time
        ? dayjs(data?.time, "hh:mm A")
        : null;

      setValues({
        email: data?.email || "",
        time: formattedInitialTime,
        date: formattedInitialDate,
      });
    }
  }, [data]);

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          className="md:mr-4 mb-4 md:mb-0"
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
          className="mb-4 md:mb-0"
          name="date"
          value={values.date}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("date", dateString)}
          error={errors.date}
          touched={touched.date}
        />
      </InputContainer>
      <Button
        type="submit"
        className="w-full max-w-24 text-center text-white btn-gradient px-4 py-1"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <Loader width={"24px"} height={"24px"} color="#fff" />
          </div>
        ) : (
          "Submit"
        )}
      </Button>
    </Form>
  );
};

export default OverturnForm;
