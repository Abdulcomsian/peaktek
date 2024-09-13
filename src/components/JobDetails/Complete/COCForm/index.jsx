import React, { useState, useEffect, useRef } from "react";
import { Form } from "@components/FormControls";
import { CustomerInformation, ProjectSummaryForm } from "@components/Forms";
import SignatureForm from "../SignatureForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import COC from "../COC";
import Depreciation from "../Depreciation";
import OverheadProfit from "../OverheadProfit";
import Conclusion from "../Conclusion";
import Button from "@components/JobDetails/Button";
import { useFormik } from "formik";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { cocSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Loader } from "@components/UI";

export default function COCForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocData, setCocData] = useState(null);

  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      insurance: "",
      claim_number: "",
      policy_number: "",
      awarded_to: "",
      released_to: "",
      job_total: "",
      customer_paid_upgrades: "",
      deductible: "",
      acv_check: "",
      rcv_check: "",
      supplemental_items: "",
      company_representative: "",
      company_printed_name: "",
      company_signed_date: null,
    },
    enableReinitialize: true,
    validationSchema: cocSchema,
    onSubmit: async (values, actions) => {
      console.log("COC VALUES", values);
      const formattedValues = {
        ...values,
        company_signed_date: values.company_signed_date
          ? dayjs(values.company_signed_date).format("DD/MM/YYYY")
          : "",
      };
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createCoc}/${id}`,
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

  useEffect(() => {
    if (cocData) {
      formik.setValues({
        name: cocData.name || "",
        email: cocData.email || "",
        phone: cocData.phone || "",
        street: cocData.street || "",
        city: cocData.city || "",
        state: cocData.state || "",
        zip_code: cocData.zip_code || "",
        insurance: cocData.insurance || "",
        claim_number: cocData.claim_number || "",
        policy_number: cocData.policy_number || "",
        awarded_to: cocData.awarded_to || "",
        released_to: cocData.released_to || "",
        job_total: cocData.job_total || "",
        customer_paid_upgrades: cocData.customer_paid_upgrades || "",
        deductible: cocData.deductible || "",
        acv_check: cocData.acv_check || "",
        rcv_check: cocData.rcv_check || "",
        supplemental_items: cocData.supplemental_items || "",
        company_representative: cocData.company_representative || "",
        company_printed_name: cocData.company_printed_name || "",
        company_signed_date: cocData.company_signed_date
          ? dayjs(cocData.company_signed_date, "DD/MM/YYYY")
          : null,
      });
    } else if (singleJobData) {
      formik.setValues({
        ...formik.values,
        name: singleJobData.name || formik.values.name,
        email: singleJobData.email || formik.values.email,
        phone: singleJobData.phone || formik.values.phone,
      });
    }
  }, [cocData, singleJobData]);

  // Create refs for each input
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    street: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zip_code: useRef(null),
    insurance: useRef(null),
    claim_number: useRef(null),
    policy_number: useRef(null),
    awarded_to: useRef(null),
    released_to: useRef(null),
    job_total: useRef(null),
    customer_paid_upgrades: useRef(null),
    deductible: useRef(null),
    acv_check: useRef(null),
    rcv_check: useRef(null),
    supplemental_items: useRef(null),
    company_representative: useRef(null),
    company_printed_name: useRef(null),
    company_signed_date: useRef(null),
    insurance_email: useRef(null),
  };

  // Focus on the first error input on form submission
  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      const firstErrorField = Object.keys(formik.errors).find(
        (field) => formik.touched[field] && formik.errors[field]
      );
      if (firstErrorField && inputRefs[firstErrorField]?.current) {
        inputRefs[firstErrorField].current.focus();
      }
    }
  }, [formik.isSubmitting, formik.isValid, formik.errors, formik.touched]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <CustomerInformation
        customer={singleJobData}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
        values={formik.values}
        setFieldValue={formik.setFieldValue}
        inputRefs={inputRefs} // Pass refs to the component
        readOnlyFields={["name", "email", "phone"]} // Pass readonly fields
      />
      <COC
        name="awarded_to"
        value={formik.values.awarded_to}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        errors={formik.errors}
        touched={formik.touched}
        inputRefs={inputRefs.awarded_to}
      />
      <Depreciation
        name="released_to"
        value={formik.values.released_to}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        errors={formik.errors}
        touched={formik.touched}
        inputRefs={inputRefs.released_to}
      />
      <OverheadProfit />
      <ProjectSummaryForm
        className=""
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
        values={formik.values}
        inputRefs={inputRefs}
      />
      <Conclusion />
      <SignatureForm
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
        values={formik.values}
        setFieldValue={formik.setFieldValue}
        inputRefs={inputRefs}
      />
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
      <div className="flex">
        <Button className="text-black mr-4 px-4 py-1">Cancel</Button>
        <Button
          type="submit"
          disabled={formik?.isSubmitting}
          className={`text-white btn-gradient px-4 py-1`}
        >
          {formik?.isSubmitting ? (
            <div className="flex justify-center items-center">
              <Loader width={"28px"} height={"28px"} color="#fff" />
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </Form>
  );
}
