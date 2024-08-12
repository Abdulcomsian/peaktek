import React, { useEffect, useState } from "react";
import { Container } from "@components";
import { CustomerInformationForm, SignaturesForm } from "@components/Forms";
import { Spin } from "antd";
import { Button } from "@components/UI";
import ShowSignatureModalBtn from "@components/Signature/ShowSignatureModalBtn";
import { useForm } from "react-hook-form";
import {
  checkCustomerAgreement,
  createAgreement,
  sendEmailToSign,
} from "@services/apiCreateCustomer";
import { useAuth } from "@context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import createSignature from "@services/apiPostSignature";
import TextSection1 from "./TextSection1";
import TextSection2 from "./TextSection2";
import Footer from "./Footer";

const CustomerAgreement = () => {
  const { id } = useParams();

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Initially set to true
  const [isEditing, setIsEditing] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});
  const { id: agreementId, ...defaultValuesform } = defaultValue;
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: agreementId && isEditing ? defaultValuesform : {},
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSigned =
    Object.keys(defaultValuesform).length > 0
      ? defaultValue.sign_image_url
        ? true
        : false
      : false;

  const isAgremeentCreated = Object.keys(defaultValuesform).length > 0;

  const onSubmit = async function (data) {
    try {
      const resp = await createAgreement(data, id);
      if (resp.status >= 200 && resp.status < 300) {
        reset();
        setIsEditing(true);
        setDefaultValue(resp.agreement);
        toast.success(resp.message);
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleSignatureSubmit = async function (image) {
    try {
      const resp = await createSignature({ id, image });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleSignByEmail = async function () {
    const resp = await sendEmailToSign(agreementId);
  };

  useEffect(() => {
    async function getAgreement() {
      try {
        const resp = await checkCustomerAgreement(id);

        if (resp.status === 200 && Object.keys(resp.agreement).length > 0) {
          setIsEditing(true);
          setDefaultValue(resp.agreement);
        } else if (resp.status === 422) {
          toast.error("Corresponding Job not found.");
          navigate("/dashboard");
        } else {
          setIsEditing(false);
          setDefaultValue({});
        }
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false); // Set isLoading to false once data is fetched
      }
    }

    getAgreement();
  }, [id]);

  if (isLoading) return <Spin fullscreen={true} />;

  if (!id) return <p>Not validate identity for creating Agreement</p>;

  const onerror = function (errror) {
    console.log(errror);
  };

  return (
    <Container className="my-6 bg-white mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] max-w-screen-xl relative">
      <form onSubmit={handleSubmit(onSubmit, onerror)}>
        <div className="absolute right-5 flex items-center gap-3">
          <>
            <ShowSignatureModalBtn
              onSubmit={handleSignatureSubmit}
              isSubmitting={isLoading}
              onOk={isSubmitted}
              disabled={!isSigned && !isAgremeentCreated}
            />
            <Button
              className="mb-3 text-xs md:text-sm"
              variant="gradient"
              disabled={!isSigned && !isAgremeentCreated}
              onClick={handleSignByEmail}
            >
              Sign by Email
            </Button>
          </>
          <Button
            className="mb-3 text-xs md:text-sm"
            variant="primaryOutline"
            type="submit"
          >
            Save
          </Button>
        </div>
        <h1 className="text-black text-xl font-semibold mb-4 mt-8">
          Customer Information
        </h1>
        <CustomerInformationForm
          className="mb-9"
          register={register}
          defaultValue={defaultValuesform} // Pass defaultValues to the form component
          disabled={isSigned}
        />
        <TextSection1 />

        <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
        <SignaturesForm
          className="mb-4"
          register={register}
          control={control}
          defaultValue={defaultValuesform} // Pass defaultValues to the signatures form component
          disabled={isSigned}
        />
        <TextSection2 />
        <Footer />
      </form>
    </Container>
  );
};

export default CustomerAgreement;
