import React, { Fragment, useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { adjustorMeetingSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Form } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { AdjustorForm } from "@components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { CheckBox, Loader, RadioButton } from "@components/UI";
import { useAuth } from "@context/AuthContext";

const AdjustorMeeting = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [adjustorMeetingData, setAdjustorMeetingData] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [status, setStatus] = useState("Approved");
  const { logout } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const setSentStatus = async () => {
  //     const token = localStorage.getItem("token");
  //     try{
  //       const resp = await clientBaseURL.post(`${}`)
  //     }
  //   };
  // }, [isSent]);

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
        console.log("ADJUSTOR MEETING REP", response);

        if (response?.status >= 200 && response?.status < 300) {
          setAdjustorMeetingData(response?.data?.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          logout();
          navigate("/");
        }
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
      complete_box: false,
    },
    enableReinitialize: true,
    validationSchema: adjustorMeetingSchema,
    onSubmit: async (values, actions) => {
      const formatPhone = values?.phone.toString();

      const formattedTime = values.time
        ? dayjs(values.time).format("hh:mm A")
        : "Invalid Time";

      const formattedDate = dayjs(values.date).format("MM/DD/YYYY");

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
        ? dayjs(adjustorMeetingData?.date, "MM/DD/YYYY")
        : null;

      const formattedInitialTime = adjustorMeetingData?.time
        ? dayjs(adjustorMeetingData?.time, "hh:mm A")
        : null;

      formik.setValues({
        name: adjustorMeetingData.name || "",
        phone: adjustorMeetingData.phone || "",
        email: adjustorMeetingData.email || "",
        complete_box: adjustorMeetingData.complete_box || false,
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
    complete_box: useRef(null),
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

  console.log("FORMIK VALUEs", formik.values);

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} delay={0} />}
      {/* <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Adjustor Meeting
      </h1> */}
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2  mb-4 md:mb-0">
            <label
              htmlFor="complete_box"
              className="text-base font-medium text-gray-900"
            >
              Sent
            </label>
            <input
              type="checkbox"
              className="h-6 w-6 border border-gray-300 bg-gray-50"
              id="complete_box"
              name="complete_box"
              checked={formik.values.complete_box}
              onChange={() =>
                formik.setFieldValue(
                  "complete_box",
                  !formik.values.complete_box
                )
              }
            />
          </div>
          <div>
            <RadioButton
              items={[
                { label: "OVERTURN", value: "Approved" },
                { label: "APPRAISAL", value: "Appraisal" },
                { label: "APPROVED", value: "Overturn" },
              ]}
              value="Approved"
            />
          </div>
        </div>
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
