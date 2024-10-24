import React, { Fragment, useEffect, useRef, useState, Suspense } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CheckBox,
  DateSelector,
  Form,
  TextBox,
} from "@components/FormControls";
import { CustomerInformation, SignatureForm } from "@components/Forms";
import TextSection1 from "@pages/CustomerAgreement/TextSection1";
import TextSection2 from "@pages/CustomerAgreement/TextSection2";

import toast from "react-hot-toast";
import { createAgreementSchema } from "@services/schema";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import {
  clientBaseURL,
  clientEndPoints,
  stagingURL,
  baseURL,
} from "@services/config";
import dayjs from "dayjs";
import SignatureModal from "@components/Modals/SignatureModal";
import { Spin } from "antd";
import { Button, Loader } from "@components/UI";
import LinkButton from "@components/UI/LinkButton";
import { useForm } from "react-hook-form";
import Footer from "./Footer";
import {
  createCustomerAggreement,
  getCustomerAggreement,
  signedCustomerAgreementByEmail,
  updateCustomerAggreementStatus,
} from "@services/apiCustomerAgreement";
import { useAuth } from "@context/AuthContext";
import ClientInformation from "../Complete/COCForm/ClientInformation";
import CustomerInformationDetail from "./CustomerInformationDetail";
import { setActiveTab } from "@store/slices/activeTabSlice";
import { getSummaryInsurance } from "@services/apiJobs";

const CustomerAgreementForm = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPdfButton, setShowPdfButton] = useState(false);
  const [isSignatureModelOpen, setIsSignatureModelOpen] = useState(false);
  const dispatch = useDispatch();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [submittingStatus, setSubmittingStatus] = useState(false);
  //   const [insuranceSummary, setInsuranceSummary] = useState(null);
  const { name, email, phone } = useSelector(
    (state) => state?.jobs?.singleJobData
  );
  console.log({ name, email, phone });
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    defaultValues: async () => {
      const resp = await getCustomerAggreement(id);
      console.log("customer agrement form", resp);
      if (
        resp.status >= 200 &&
        resp.status < 300 &&
        resp?.data?.data?.agreement
      ) {
        const { agreement, jobsummary } = resp.data.data;
        return { ...agreement, ...jobsummary };
      } else return { name, email, phone };
    },
  });

  const isFormCompleted = watch("is_complete");
  const agreementId = watch("id");
  const sign_pdf_url = getValues().sign_pdf_url;
  const sign_image_url = watch("sign_image_url");
  const FormStatus = getValues().status;

  console.log(isFormCompleted, agreementId, sign_image_url, sign_pdf_url);
  //   useEffect(() => {
  //     const fetchInsuranceData = async () => {
  //       const resp = await getSummaryInsurance(id);
  //       console.log("INSURANCE INFOR", resp);
  //       if (resp.status >= 200 && resp.status < 300) {
  //         setInsuranceSummary(resp.data); // store fetched data in the state
  //       } else {
  //         console.log("Failed to fetch insurance summary");
  //       }
  //     };
  //     fetchInsuranceData();
  //   }, [id]);

  //   useEffect(() => {
  //     dispatch(fetchSingleJob());
  //   }, []);

  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${sign_pdf_url}`;
    window.open(fullFileUrl, "_blank");
  };
  const sendFormByEmail = async () => {
    setIsSendingEmail(true);
    const response = await signedCustomerAgreementByEmail(
      agreementId,
      location?.pathname
    );
    if (response?.status >= 200 && response?.status < 300) {
      toast.success(response?.message);
    }
    setIsSendingEmail(false);
  };

  const handleSigned = async () => {
    const updatedResp = await getCustomerAggreement(id);
    if (updatedResp.status >= 200 && updatedResp.status < 300) {
      reset(updatedResp.data.agreement);
    }
  };

  const onSubmit = async function (data) {
    const dataToLoad = { ...data };
    if (!data.status) dataToLoad["status"] = false;

    const resp = await createCustomerAggreement(dataToLoad, id);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
      if (resp.data.agreement.status) {
      }

      const updatedResp = await getCustomerAggreement(id);
      if (updatedResp.status >= 200 && updatedResp.status < 300) {
        const { agreement, jobsummary } = updatedResp.data.data;
        reset({ ...agreement, ...jobsummary });
        // reset(updatedResp.data.agreement);
      }
    }
    if (resp.status === 401) {
      logout();
      navigate("/");
    }
  };

  const handleCheckboxChange = async (e) => {
    const status = e.target.checked;
    console.log("Status", status);
    setSubmittingStatus(true);
    try {
      const resp = await updateCustomerAggreementStatus({ status }, id); // Assuming this API updates the status
      console.log("statusasdfasdf", resp);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success("Status updated successfully");
        // navigate(`/job-details/${jobId}/complete`)
        if (resp.data.agreement.status) {
          dispatch(setActiveTab("estimate-prepared"));
          navigate(`/job-details/${id}/estimate-prepared`);
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while updating status");
    } finally {
      setSubmittingStatus(false);
    }
  };

  return (
    <Fragment>
      {isLoading && <Spin fullscreen={true} />}
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex items-center gap-3">
          <CheckBox
            label="Status:"
            id="status"
            name="status"
            register={register}
            onChange={handleCheckboxChange}
            // disabled={!isFormCompleted || !sign_image_url}
          />
          {submittingStatus && (
            <Loader width="24px" height="24px" color="#000" />
          )}
        </div>

        {showPdfButton || sign_image_url ? (
          <Button
            className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
            onClick={openFileHandler}
          >
            View Pdf
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-6">
            <Button
              className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
              onClick={() => setIsSignatureModelOpen(true)}
              disabled={!isFormCompleted}
            >
              Sign Now
            </Button>
            <Button
              className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
              onClick={sendFormByEmail}
              disabled={!isFormCompleted}
            >
              {isSendingEmail ? (
                <Loader width={"24px"} height={"24px"} color="#fff" />
              ) : (
                "Send for Approval"
              )}
            </Button>
          </div>
        )}
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Customer Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomerInformationDetail
            register={register}
            isCustomerAggrementInfo={true}
          />
          {/* {insuranceSummary ? (
          ) : (
            <CustomerInformationDetail
              insuranceSummary={insuranceSummary}
              register={register}
            /> // A clear message instead of a general loader
          )} */}
          <TextSection1 />
          <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
          <SignatureForm register={register} control={control} />
          <TextSection2 />
          <Footer register={register} control={control} />
          <Button
            variant="gradient"
            type="submit"
            className="w-full max-w-24 font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
      {isSignatureModelOpen && (
        <SignatureModal
          open={isSignatureModelOpen}
          onCancel={() => setIsSignatureModelOpen((is) => !is)}
          onOk={() => setIsSignatureModelOpen((is) => !is)}
          id={agreementId}
          setShowPdfButton={() => {
            handleSigned();
            setShowPdfButton;
          }}
        />
      )}
    </Fragment>
  );
};

export default CustomerAgreementForm;
