import React, { useEffect, useState } from "react";
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

const OverturnForm = ({ id, data }) => {
  let formattedInitialDate = data?.date
    ? dayjs(data?.date, "DD/MM/YYYY")
    : null;
  const [initialValues, setInitialValues] = useState({
    email: "",
    time: null,
    date: null,
  });

  useEffect(() => {
    if (data) {
      const formattedInitialDate = data?.date
        ? dayjs(data?.date, "DD/MM/YYYY")
        : null;

      const formattedInitialTime = data?.time
        ? dayjs(data?.time, "hh:mm A")
        : null;

      setInitialValues({
        email: data?.email || "",
        time: formattedInitialTime,
        date: formattedInitialDate,
      });
    }
  }, [data]);

  const formik = useFormik({
    initialValues,
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
    <Form onSubmit={formik.handleSubmit} className="mb-4">
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          className="md:mr-4 mb-4 md:mb-0"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <CustomTimePicker
          label="Select a Time"
          value={formik.values.time}
          name="time"
          onBlur={formik.handleBlur}
          onChange={(timeString) => formik.setFieldValue("time", timeString)}
          error={formik.errors.time}
          touched={formik.touched.time}
          className="mb-4 md:mb-0 md:mr-4"
        />
        <DateSelector
          label="Select Date"
          className="mb-4 md:mb-0"
          name="date"
          value={formik.values.date}
          onBlur={formik.handleBlur}
          onChange={(dateString) => formik.setFieldValue("date", dateString)}
          error={formik.errors.date}
          touched={formik.touched.date}
        />
      </InputContainer>
      <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
        Submit
      </Button>
    </Form>
  );
};

export default OverturnForm;
