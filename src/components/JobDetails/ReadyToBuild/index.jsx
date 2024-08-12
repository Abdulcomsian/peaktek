import React, { useState, useEffect, Fragment } from "react";
import {
  Ckeditor,
  CustomTimePicker,
  DateSelector,
  Form,
  TextBox,
} from "@components/FormControls";
import { useFormik } from "formik";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "@services/config";
import Button from "@components/JobDetails/Button";
import { InputContainer } from "@components/index";
import { useParams } from "react-router-dom";
import { readyToBuildSchema } from "@services/schema";
import { Spin } from "antd";

const ReadyToBuild = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [overTurnData, setOverTurnData] = useState(null);
  useEffect(() => {
    const getReadyToBuildData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        setLoading(true);
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getReadyToBuild}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status >= 200 && response?.status < 300) {
          setOverTurnData(response?.data?.data);
        }
      } catch (error) {
        if (error?.response) {
          console.error(
            error?.response?.data?.error || error?.response?.data?.message
          );
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) getReadyToBuildData();
  }, [id]);
  let formattedInitialDate = overTurnData?.date
    ? dayjs(overTurnData?.date, "DD/MM/YYYY")
    : null;
  let formattedInitialTime = overTurnData?.time
    ? dayjs(overTurnData?.time, "hh:mm A")
    : null;
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
      recipient: overTurnData?.recipient || "",
      date: formattedInitialDate,
      time: formattedInitialTime,
      text: overTurnData?.text || "",
    },
    enableReinitialize: true,
    validationSchema: readyToBuildSchema,
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
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createReadyToBuild}/${id}`,
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
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Ready to Build
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <Form onSubmit={handleSubmit}>
          <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
            <TextBox
              label="recipient"
              placeholder="John Doe"
              type="text"
              name="recipient"
              className="md:mr-4 mb-4 md:mb-0"
              value={values.recipient}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.recipient}
              touched={touched.recipient}
            />
            <DateSelector
              label="Select a Date"
              className="md:mr-4 mb-4 md:mb-0"
              name="date"
              value={values.date}
              onBlur={handleBlur}
              onChange={(dateString) => setFieldValue("date", dateString)}
              error={errors.date}
              touched={touched.date}
            />
            <CustomTimePicker
              label="Select a Time"
              className="mb-4 md:mb-0"
              value={values.time}
              name="time"
              onBlur={handleBlur}
              onChange={(timeString) => setFieldValue("time", timeString)}
              error={errors.time}
              touched={touched.time}
            />
          </InputContainer>
          <Ckeditor
            className="mb-4"
            value={values.text}
            onChange={(content) => setFieldValue("text", content)}
          />
          <Button type="submit" className="text-white btn-gradient px-4 py-1">
            Build SMS
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default ReadyToBuild;
