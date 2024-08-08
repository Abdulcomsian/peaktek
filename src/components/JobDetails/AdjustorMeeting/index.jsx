import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import { adjustorMeetingSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Form } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { AdjustorForm } from "@components/Forms";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

const AdjustorMeeting = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [adjustorMeetingData, setAdjustorMeetingData] = useState(null);

  useEffect(() => {
    const getAdjustorMeetingData = async () => {
      try {
        setLoading(true);
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getAdjustorMeeting}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          setAdjustorMeetingData(response?.data?.data);
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
    getAdjustorMeetingData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      time: null,
      date: null,
    },
    enableReinitialize: true,
    validationSchema: adjustorMeetingSchema,
    onSubmit: async (values, actions) => {
      const formatPhone = values?.phone.toString();

      const formattedTime = values.time
        ? dayjs(values.time).format("hh:mm A")
        : "Invalid Time";

      const formattedDate = dayjs(values.date).format("DD/MM/YYYY");

      const formattedValues = {
        ...values,
        phone: formatPhone,
        time: formattedTime,
        date: formattedDate,
      };

      try {
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createAdjustorMeeting}/${id}`,
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
    if (adjustorMeetingData) {
      const formattedInitialDate = adjustorMeetingData?.date
        ? dayjs(adjustorMeetingData?.date, "DD/MM/YYYY")
        : null;

      const formattedInitialTime = adjustorMeetingData?.time
        ? dayjs(adjustorMeetingData?.time, "hh:mm A")
        : null;

      formik.setValues({
        name: adjustorMeetingData.name || "",
        phone: adjustorMeetingData.phone || "",
        email: adjustorMeetingData.email || "",
        time: formattedInitialTime,
        date: formattedInitialDate,
      });
    }
  }, [adjustorMeetingData]);

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Adjustor Meeting
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <Form onSubmit={formik.handleSubmit}>
          <AdjustorForm
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          />
          <div className="flex">
            <Button className="text-black mr-4 border border-gray-300 px-4 py-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`text-white btn-gradient px-4 py-1`}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
