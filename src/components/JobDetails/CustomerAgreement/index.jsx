import React, { Fragment, useEffect, useRef, useState } from "react";
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
} from "@services/apiCustomerAgreement";
import { useAuth } from "@context/AuthContext";

const CustomerAgreementForm = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    defaultValues: async () => {
      const resp = await getCustomerAggreement(id);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data.agreement;
      }
    },
  });

  const isFormCompleted = watch("is_complete");
  const agreementId = watch("id");
  const sign_pdf_url = watch("sign_pdf_url");
  const FormStatus = watch("status");

  const [showPdfButton, setShowPdfButton] = useState(false);

  const [isSignatureModelOpen, setIsSignatureModelOpen] = useState(false);

  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${sign_pdf_url}`;
    window.open(fullFileUrl, "_blank");
  };
  const sendFormByEmail = async () => {
    const response = await signedCustomerAgreementByEmail(
      agreementId,
      location?.pathname
    );
    if (response?.status >= 200 && response?.status < 300) {
      toast.success(response?.data?.message);
      setIsDone(true);
    }
  };

  const onSubmit = async function (data) {
    const dataToLoad = { ...data };
    if (!data.status) dataToLoad["status"] = false;

    const resp = await createCustomerAggreement(dataToLoad, id);
    console.log("resp", resp);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
    }
    if (resp.status === 401) {
      logout();
      navigate("/");
    }
  };

  if (FormStatus && sign_pdf_url)
    return (
      <p className="text-center text-sm text-stone-600 ">
        👋 Customer agreement is already created, Please{" "}
        <LinkButton onClick={openFileHandler} className="text-sm">
          Click here
        </LinkButton>
        to view agreement
      </p>
    );

  return (
    <Fragment>
      {isLoading && <Spin fullscreen={true} />}
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <CheckBox
          label="Status:"
          id="status"
          name="status"
          register={register}
          disabled={!isFormCompleted || !sign_pdf_url}
        />

        {showPdfButton ? (
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
              Send for Approval
            </Button>
          </div>
        )}
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Customer Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomerInformation register={register} />
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
          setIsDone={setIsDone}
          setShowPdfButton={setShowPdfButton}
        />
      )}
    </Fragment>
  );
};

export default CustomerAgreementForm;
