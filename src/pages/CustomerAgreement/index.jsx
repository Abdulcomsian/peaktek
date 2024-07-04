import React, { useRef, useState } from "react";
import { Container } from "@components";
import styles from "./CustomerAgreement.module.css";
import { CustomerInformationForm, SignaturesForm } from "@components/Forms";
import {
  acknowledgement,
  insurance,
  pricing,
  contractDetails,
} from "@assets/data";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";

import { Button } from "@components/UI";
import TitledSection from "@components/UI/TitledSection";
import ShowSignatureModalBtn from "@components/Signature/ShowSignatureModalBtn";
import { useForm } from "react-hook-form";
import { createAgreement } from "@services/apiCreateCustomer";
import { useAuth } from "@context/AuthContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import createSignature from "@services/apiPostSignature";

const CustomerAgreement = () => {
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async function (data) {
    try {
      console.log(data);
      const resp = await createAgreement(data);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.message);
        reset();
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
      console.log(resp);
    } catch (error) {
    } finally {
    }
  };

  const handleSignatureSubmit = async function (image) {
    try {
      console.log(image, "id", id);
      setIsLoading(true);
      const resp = await createSignature({ id, image });
      console.log(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] max-w-screen-xl relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="absolute right-5 flex items-center gap-3">
          <ShowSignatureModalBtn
            onSubmit={handleSignatureSubmit}
            isSubmitting={isLoading}
          />
          <Button className="mb-3 text-xs md:text-sm" variant="gradient">
            Sign by Email
          </Button>
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
        <CustomerInformationForm className="mb-9" register={register} />
        <TitledSection title="ACKNOWLEDGEMENTS">
          <ul className="list-disc pl-6">
            {acknowledgement?.map((items) => (
              <li key={items?.id} className="mb-2 text-sm">
                {items?.text}
              </li>
            ))}
          </ul>
        </TitledSection>
        <TitledSection title="INSURANCE">
          <ul>
            {insurance?.map((items) => (
              <li key={items?.id} className="mb-4 text-sm">
                {items?.text}
              </li>
            ))}
          </ul>
        </TitledSection>
        <TitledSection title="PRICING">
          <ul>
            {pricing?.map((items) => (
              <li key={items?.id} className="mb-4 text-sm">
                {items?.text}
              </li>
            ))}
          </ul>
        </TitledSection>

        <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
        <SignaturesForm className="mb-4" register={register} />
        <TitledSection>
          <p className="font-medium text-sm mb-4">
            This Contract and any agreements entered into between PeakTek
            Roofing & Restoration (hereinafter referred to as the “Company” or
            “PeakTek”) and the customer(s) identified herein on the Agreement’s
            page 1 shall adhere to all applicable copyright laws, regulations,
            and ordinances in the state of record.
          </p>
        </TitledSection>
        <TitledSection title="Indemnity Statement:">
          <p className="font-medium text-sm mb-4">
            This Contract and any agreements entered into between PeakTek
            Roofing & Restoration (hereinafter referred to as the “Company” or
            “PeakTek”) and the customer(s) identified herein on the Agreement’s
            page 1 shall adhere to all applicable copyright laws, regulations,
            and ordinances in the state of record
          </p>
        </TitledSection>
        <ul className="list-decimal pl-4 mb-4">
          {contractDetails?.map((items) => (
            <li
              key={items?.id}
              className="text-gray-600 mb-3 text-justify text-sm"
            >
              {items?.text}
            </li>
          ))}
        </ul>
        <div className="flex flex-col md:flex-row  md:justify-between md:items-center mb-4">
          <div className="flex items-center md:mb-0 mb-4 w-full mx-2">
            <span className="mr-2">I</span>{" "}
            <Input className={`${styles["custom-input"]} md:mr-2`} />
          </div>
          <span className="w-full md:mb-0 mb-4">
            the undersigned, hereby cancel this transaction as of{" "}
          </span>
          <DatePicker
            className={` w-full md:max-w-xs`}
            size="large"
            defaultValue={dayjs("01/01/2015", dateFormatList[0])}
            format={dateFormatList}
          />
        </div>
        <div>Customer Signature:</div>
      </form>
    </Container>
  );
};

export default CustomerAgreement;
