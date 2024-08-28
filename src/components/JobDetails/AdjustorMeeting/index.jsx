import React, { Fragment, useEffect, useState, useRef } from "react";
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
import { Loader } from "@components/UI";

const AdjustorMeeting = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [adjustorMeetingData, setAdjustorMeetingData] = useState(null);

  useEffect(() => {
    const getAdjustorMeetingData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
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
    if (id) {
      getAdjustorMeetingData();
    }
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
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
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

  const inputRefs = {
    name: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    time: useRef(null),
    date: useRef(null),
  };
  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      const firstErrorField = Object.keys(formik.errors).find(
        (field) => formik.errors[field]
      );
      if (firstErrorField && inputRefs[firstErrorField]?.current) {
        const fieldElement = inputRefs[firstErrorField].current;
        fieldElement.focus();
        fieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // Set the cursor inside the input field if it supports setSelectionRange
        if (
          fieldElement.setSelectionRange &&
          ["text", "search", "url", "tel", "password"].includes(
            fieldElement.type
          )
        ) {
          const length = fieldElement.value.length;
          fieldElement.setSelectionRange(length, length);
        }
      }
    }
  }, [formik.isSubmitting, formik.isValid, formik.errors]);

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} delay={0} />}
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Adjustor Meeting
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <Form onSubmit={formik.handleSubmit}>
          <AdjustorForm
            className="mb-8"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            inputRefs={inputRefs}
          />
          <div className="flex">
            <Button className="text-black mr-4 border border-gray-300 px-4 py-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formik?.isSubmitting}
              className={`w-full max-w-24 text-white btn-gradient px-4 py-1`}
            >
              {formik?.isSubmitting ? (
                <div className="flex justify-center items-center">
                  <Loader width={"24px"} height={"24px"} color="#fff" />
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
