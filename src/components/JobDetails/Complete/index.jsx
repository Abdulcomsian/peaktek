import React, { Fragment, useEffect, useRef } from "react";
import { Form } from "@components/FormControls";
import { CustomerInformation, ProjectSummaryForm } from "@components/Forms";
import SignatureForm from "./SignatureForm";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import COC from "./COC";
import Depreciation from "./Depreciation";
import OverheadProfit from "./OverheadProfit";
import Conclusion from "./Conclusion";
import Button from "@components/JobDetails/Button";
import { useFormik } from "formik";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { cocSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
const Complete = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleJob(id));
  }, [id]);

  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);
  console.log("Single Job", singleJobData);

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
      company_signed_date: "",
    },
    validationSchema: cocSchema,
    onSubmit: async (values, actions) => {
      // Format all date values to 'DD/MM/YYYY'
      const formattedValues = {
        ...values,
        company_signed_date: values.company_signed_date
          ? dayjs(values.company_signed_date).format("DD/MM/YYYY")
          : "",
      };
      console.log("Formatted Values", formattedValues);

      // Uncomment and adjust the following code for actual form submission
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
  // Update Formik initial values when singleJobData changes
  useEffect(() => {
    if (singleJobData) {
      formik.setValues({
        name: singleJobData?.name || "",
        email: singleJobData?.email || "",
        phone: singleJobData?.phone || "",
        street: formik.values.street,
        city: formik.values.city,
        state: formik.values.state,
        zip_code: formik.values.zip_code,
        insurance: formik.values.insurance,
        claim_number: formik.values.claim_number,
        policy_number: formik.values.policy_number,
        awarded_to: formik.values.awarded_to,
        released_to: formik.values.released_to,
        job_total: formik.values.job_total,
        customer_paid_upgrades: formik.values.customer_paid_upgrades,
        deductible: formik.values.deductible,
        acv_check: formik.values.acv_check,
        rcv_check: formik.values.rcv_check,
        supplemental_items: formik.values.supplemental_items,
        company_representative: formik.values.company_representative,
        company_printed_name: formik.values.company_printed_name,
        company_signed_date: formik.values.company_signed_date,
      });
    }
  }, [singleJobData]);
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
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        COC
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Customer Information
        </h2>
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
            handleBlur={formik?.handleBlur}
            errors={formik?.errors}
            touched={formik?.touched}
            inputRefs={inputRefs?.awarded_to}
          />
          <Depreciation
            name="released_to"
            value={formik.values.released_to}
            handleChange={formik.handleChange}
            handleBlur={formik?.handleBlur}
            errors={formik?.errors}
            touched={formik?.touched}
            inputRefs={inputRefs?.released_to}
          />
          <OverheadProfit />
          <ProjectSummaryForm
            className=""
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            touched={formik?.touched}
            errors={formik?.errors}
            values={formik?.values}
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
              defaultValue=""
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

export default Complete;
