import React, { Fragment, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DateSelector, Form, TextBox } from "@components/FormControls";
import { CustomerInformation, SignatureForm } from "@components/Forms";
import TextSection1 from "@pages/CustomerAgreement/TextSection1";
import TextSection2 from "@pages/CustomerAgreement/TextSection2";
import Button from "@components/JobDetails/ui/Button";
import toast from "react-hot-toast";
import { createAgreementSchema } from "@services/schema";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { clientBaseURL, clientEndPoints } from "@services/config";
import dayjs from "dayjs";

const CustomerAgreementForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleJob(id));
  }, [id]);

  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);

  const formik = useFormik({
    initialValues: {
      street: "",
      city: "",
      state: "",
      zip_code: "",
      insurance: "",
      claim_number: "",
      policy_number: "",
      company_signature: "",
      company_printed_name: "",
      company_date: "",
      customer_signature: "",
      customer_printed_name: "",
      customer_date: "",
    },
    validationSchema: createAgreementSchema,
    onSubmit: async (values, actions) => {
      // Format all date values to 'DD/MM/YYYY'
      const formattedValues = {
        ...values,
        company_date: values.company_date
          ? dayjs(values.company_date).format("DD/MM/YYYY")
          : "",
        customer_date: values.customer_date
          ? dayjs(values.customer_date).format("DD/MM/YYYY")
          : "",
      };

      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createAgreement}/${singleJobData?.id}`,
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

  // Create refs for each input
  const inputRefs = {
    street: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zip_code: useRef(null),
    insurance: useRef(null),
    claim_number: useRef(null),
    policy_number: useRef(null),
    company_signature: useRef(null),
    company_printed_name: useRef(null),
    company_date: useRef(null),
    customer_signature: useRef(null),
    customer_printed_name: useRef(null),
    customer_date: useRef(null),
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
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <h1 className="font-poppins font-medium text-xl text-center mb-4 md:mb-0">
          Customer Agreement
        </h1>
        <div className="flex items-center justify-center gap-6">
          <Button className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md">
            Sign Now
          </Button>
          <Button className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md">
            Send for Approval
          </Button>
        </div>
      </div>
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
          />
          <TextSection1 />
          <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
          <SignatureForm
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            inputRefs={inputRefs} // Pass refs to the component
          />
          <TextSection2 />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div className="flex items-center md:mb-0 w-full md:max-w-56 mb-4 mx-2">
              <span className="mr-2">I</span>
              <TextBox
                className={`w-full md:mr-2`}
                placeholder="Enter Name"
                ref={inputRefs["name"]}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <span className="w-full md:mb-0 mb-4">
              the undersigned, hereby cancel this transaction as of{" "}
              <span className="font-bold">Customer Signature:</span>
            </span>
            <TextBox
              className={`w-full md:max-w-xs md:ml-2`}
              placeholder="Enter Signature"
              ref={inputRefs["signature"]}
              name="signature"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between items-end">
            <DateSelector
              className="w-full md:max-w-xs mb-4"
              label="Select a Date"
              ref={inputRefs["customer_date"]}
              name="customer_date"
              value={formik.values.customer_date}
              onChange={(dateString) =>
                formik.setFieldValue("customer_date", dateString)
              }
              onBlur={formik.handleBlur}
              error={formik.errors.customer_date}
              touched={formik.touched.customer_date}
            />
            <div>
              <Button className="mr-6">Cancel</Button>
              <Button
                className="text-white btn-gradient px-4 py-1"
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default CustomerAgreementForm;
