import React, { Fragment, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { DateSelector, Form, TextBox } from "@components/FormControls";
import { CustomerInformation, SignatureForm } from "@components/Forms";
import TextSection1 from "@pages/CustomerAgreement/TextSection1";
import TextSection2 from "@pages/CustomerAgreement/TextSection2";
import Button from "@components/JobDetails/Button";
import toast from "react-hot-toast";
import { createAgreementSchema } from "@services/schema";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { clientBaseURL, clientEndPoints, stagingURL } from "@services/config";
import dayjs from "dayjs";
import SignatureModal from "@components/Modals/SignatureModal";
import { Spin } from "antd";
const CustomerAgreementForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isApprovalButtonDisabled, setIsApprovalButtonDisabled] =
    useState(false);
  const [isSignatureModelOpen, setIsSignatureModelOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getCustomerAgreement}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          setCustomerData(response?.data?.agreement);
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
      getCustomerData();
    }
  }, [id]);

  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);

  const getSignatureEmail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.post(
        `${clientEndPoints?.getSignatureEmail}/${id}`,
        { url: `${stagingURL}${location?.pathname}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
        setIsApprovalButtonDisabled(true);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    }
  };

  const showSignatureModel = () => {
    setIsSignatureModelOpen(true);
  };

  const closeSignatureModel = () => {
    setIsSignatureModelOpen(false);
  };

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
    // validationSchema: createAgreementSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
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
          `${clientEndPoints?.createAgreement}/${id}`,
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
    if (customerData) {
      formik.setValues({
        street: customerData.street || "",
        city: customerData.city || "",
        state: customerData.state || "",
        zip_code: customerData.zip_code || "",
        insurance: customerData.insurance || "",
        claim_number: customerData.claim_number || "",
        policy_number: customerData.policy_number || "",
        company_signature: customerData.company_signature || "",
        company_printed_name: customerData.company_printed_name || "",
        company_date: customerData.company_date || "",
        customer_signature: customerData.customer_signature || "",
        customer_printed_name: customerData.customer_printed_name || "",
        customer_date: customerData.customer_date || "",
      });
    }
  }, [customerData]);

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
      {loading && <Spin fullscreen={true} />}
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <h1 className="font-poppins font-medium text-xl text-center mb-4 md:mb-0">
          Customer Agreement
        </h1>
        <div className="flex items-center justify-center gap-6">
          <Button
            className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
            onClick={showSignatureModel}
          >
            Sign Now
          </Button>
          <Button
            className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
            onClick={getSignatureEmail}
            disabled={isApprovalButtonDisabled}
          >
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
            inputRefs={inputRefs}
            readOnlyFields={["name", "email", "phone"]}
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
            inputRefs={inputRefs}
          />
          <TextSection2 />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div className="flex items-center md:mb-0 w-full md:max-w-[22rem] mb-4">
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
              <span className="font-bold">Date:</span>
            </span>
            <DateSelector
              className={`w-full md:max-w-[22rem] md:ml-1`}
              placeholder="Enter Date"
              ref={inputRefs["date"]}
              name="date"
              onChange={(date) => formik.setFieldValue("date", date)}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
          </div>
          <Button
            type="submit"
            className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
          >
            Save
          </Button>
        </Form>
      </div>
      {isSignatureModelOpen && (
        <SignatureModal
          open={isSignatureModelOpen}
          onCancel={closeSignatureModel}
          onOk={closeSignatureModel}
          id={id}
        />
      )}
    </Fragment>
  );
};

export default CustomerAgreementForm;
