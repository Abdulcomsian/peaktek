import React, { Fragment, useEffect, useRef, useState } from "react";
import { CustomerInformation, SignatureForm } from "@components/Forms";
import Button from "@components/JobDetails/Button";
import MaterialForm from "./Material";
import { useParams } from "react-router-dom";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { inProgressSchema } from "@services/schema";
import { Form, SelectBox, TextBox } from "@components/FormControls";
import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { Spin } from "antd";
import MediaForm from "./Media";
import { Loader } from "@components/UI";
import { InputContainer } from "@components";

const InProgress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [inProgressData, setInProgressData] = useState(null);
  const [showRenameBox, setShowRenameBox] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        setLoading(true);
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getQCInspection}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          setFiles(response?.data?.data?.images);
          setShowRenameBox(true);
          setInProgressData(response?.data?.data);
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
      dispatch(fetchSingleJob(id));
      fetchData();
    }
  }, [id, dispatch]);

  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);

  const formattedCompanyDate = inProgressData?.company_signed_date
    ? dayjs(inProgressData.company_signed_date, "DD/MM/YYYY")
    : null;
  const formattedCustomerDate = inProgressData?.customer_signed_date
    ? dayjs(inProgressData.customer_signed_date, "DD/MM/YYYY")
    : null;

  const formik = useFormik({
    initialValues: {
      name: singleJobData?.name || "",
      email: singleJobData?.email || "",
      phone: singleJobData?.phone || "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      insurance: "",
      claim_number: "",
      policy_number: "",
      company_signature: "",
      company_printed_name: "",
      company_date: null,
      customer_signature: "",
      customer_printed_name: "",
      customer_date: null,
      materials: [{ material: "", damaged: false, notes: "" }],
    },
    enableReinitialize: true,
    validationSchema: inProgressSchema,
    onSubmit: async (values, actions) => {
      const token = localStorage.getItem("token");
      const formattedValues = {
        ...values,
        company_date: values.company_date
          ? values.company_date.format("DD/MM/YYYY")
          : "",
        customer_date: values.customer_date
          ? values.customer_date.format("DD/MM/YYYY")
          : "",
      };

      try {
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await clientBaseURL.post(
          `${clientEndPoints?.storeQCInspection}/${id}`,
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
    if (inProgressData) {
      formik.setValues({
        name: singleJobData?.name || "",
        email: singleJobData?.email || "",
        phone: singleJobData?.phone || "",
        street: inProgressData.street || "",
        city: inProgressData.city || "",
        state: inProgressData.state || "",
        zip_code: inProgressData.zip_code || "",
        insurance: inProgressData.insurance || "",
        claim_number: inProgressData.claim_number || "",
        policy_number: inProgressData.policy_number || "",
        company_signature: inProgressData.company_representative || "",
        company_printed_name: inProgressData.company_printed_name || "",
        company_date: formattedCompanyDate,
        customer_signature: inProgressData.customer_signature || "",
        customer_printed_name: inProgressData.customer_printed_name || "",
        customer_date: formattedCustomerDate,
        materials: inProgressData.materials?.map((material) => ({
          material: material.material || "",
          damaged: material.damaged || false,
          notes: material.notes || "",
        })) || [{ material: "", damaged: false, notes: "" }],
      });
      formik.validateForm();
    }
  }, [inProgressData]);

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        In Progress
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <Form onSubmit={formik.handleSubmit} className="mb-4">
          <h2 className="text-black text-xl font-medium mb-4 font-poppins">
            Quality Control Form (QC)
          </h2>
          {/* <CustomerInformation
            customer={singleJobData}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          /> */}
          <MaterialForm
            values={formik.values.materials}
            setFieldValue={formik.setFieldValue}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched.materials}
            errors={formik.errors.materials}
          />
          {/* <SignatureForm
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          /> */}

          <div className="flex items-center mb-6">
            <input
              id="complete"
              type="checkbox"
              className="w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="complete"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Complete
            </label>
          </div>

          <Button
            type="submit"
            disabled={formik?.isSubmitting}
            className="w-full max-w-24 text-white btn-gradient px-4 py-1"
          >
            {formik?.isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
        <MediaForm
          id={id}
          className="mb-4"
          data={inProgressData}
          filesData={files}
          showRenameBox={showRenameBox}
        />
      </div>
    </Fragment>
  );
};

export default InProgress;
