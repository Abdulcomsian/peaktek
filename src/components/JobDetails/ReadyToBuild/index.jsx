import React, { useState, useEffect, Fragment } from "react";
import {
  Ckeditor,
  CustomTimePicker,
  DateSelector,
  Form,
  SelectBox,
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
import { Loader } from "@components/UI";

const ReadyToBuild = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    recipient: "",
    date: null,
    time: null,
    text: "",
    sub_contractor_id: "",
  });

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
          const data = response?.data?.data;
          const formattedInitialDate = data?.date
            ? dayjs(data?.date, "DD/MM/YYYY")
            : null;
          const formattedInitialTime = data?.time
            ? dayjs(data?.time, "hh:mm A")
            : null;
          setInitialValues({
            recipient: data?.recipient || "",
            date: formattedInitialDate,
            time: formattedInitialTime,
            text: data?.text || "",
          });
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

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: readyToBuildSchema,
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
        <Form onSubmit={formik.handleSubmit}>
          <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
            <TextBox
              label="Recipient"
              placeholder="John Doe"
              type="text"
              name="recipient"
              className="md:mr-4 mb-4 md:mb-0"
              value={formik.values.recipient}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.errors.recipient}
              touched={formik.touched.recipient}
            />
            <DateSelector
              label="Select a Date"
              className="md:mr-4 mb-4 md:mb-0"
              name="date"
              value={formik.values.date}
              onBlur={formik.handleBlur}
              onChange={(dateString) =>
                formik.setFieldValue("date", dateString)
              }
              error={formik.errors.date}
              touched={formik.touched.date}
            />
            <CustomTimePicker
              label="Select a Time"
              className="md:mr-4 mb-4 md:mb-0"
              value={formik.values.time}
              name="time"
              onBlur={formik.handleBlur}
              onChange={(timeString) =>
                formik.setFieldValue("time", timeString)
              }
              error={formik.errors.time}
              touched={formik.touched.time}
            />
            <SelectBox
              label="Sub Contractor"
              placeholder="Select Sub Contractor"
              className="mb-4 md:mb-0 max-w-xl"
              name="supplier_id"
              options={[
                { label: "Red", value: "red" },
                { label: "Blue", value: "blue" },
                { label: "Green", value: "green" },
              ]}
              // ref={inputRefs?.company_signature}
              // value={values?.company_signature || ""}
              // onBlur={handleBlur}
              // onChange={handleChange}
              // error={errors?.company_signature}
              // touched={touched?.company_signature}
            />
          </InputContainer>
          <Ckeditor
            label="Notes"
            id="text"
            className="mb-4"
            value={formik.values.text}
            onChange={(content) => formik.setFieldValue("text", content)}
            error={formik.errors.text}
            touched={formik.touched.text}
          />
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            className="w-full max-w-28 text-white btn-gradient px-4 py-1"
          >
            {formik.isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
              </div>
            ) : (
              "Build SMS"
            )}
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default ReadyToBuild;
