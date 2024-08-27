import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  adjustorMeetingSchema,
  estimatePreparedSchema,
} from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Form } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { EstimatePreparedForm } from "@components/Forms";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { Loader } from "@components/UI";

const EstimatePrepared = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [estimatePreparedData, setEstimatePreparedData] = useState(null);

  useEffect(() => {
    const getEstimatePreparedData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        setLoading(true);
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getEstimatePrepared}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          setEstimatePreparedData(response?.data?.data);
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
      getEstimatePreparedData();
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      prepared_by: "",
      complete_box: false,
      date: null,
    },
    enableReinitialize: true,
    validationSchema: estimatePreparedSchema,
    onSubmit: async (values, actions) => {
      const formattedDate = dayjs(values.date).format("DD/MM/YYYY");

      const formattedValues = {
        ...values,
        date: formattedDate,
      };

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createEstimatePrepared}/${id}`,
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

  useEffect(() => {
    if (estimatePreparedData) {
      const formattedInitialDate = estimatePreparedData?.date
        ? dayjs(estimatePreparedData?.date, "DD/MM/YYYY")
        : null;

      formik.setValues({
        name: estimatePreparedData.name || "",

        date: formattedInitialDate,
      });
    }
  }, [estimatePreparedData]);

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} delay={0} />}

      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Estimate Prepared
        </h2>
        <Form onSubmit={formik.handleSubmit}>
          <EstimatePreparedForm
            className="mb-8"
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

export default EstimatePrepared;
