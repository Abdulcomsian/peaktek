import React from "react";
import CustomerInformationForm from "@components/Forms/CustomerInformation";
import Container from "@components/Container";
import SignaturesForm from "@components/Forms/Signatures";
import styles from "./CustomerAgreement.module.css";
import {
  acknowledgement,
  insurance,
  pricing,
  contractDetails,
} from "@assets/data";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
const CustomerAgreement = () => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        Customer Information
      </h1>
      <CustomerInformationForm className="mb-4" />
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black mb-2">
          ACKNOWLEDGEMENTS
        </h2>
        <ul className="list-disc pl-6">
          {acknowledgement?.map((items) => (
            <li key={items?.id} className="mb-2">
              {items?.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black mb-2">INSURANCE</h2>
        <ul>
          {insurance?.map((items) => (
            <li key={items?.id} className="mb-4">
              {items?.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black mb-2">PRICING</h2>
        <ul>
          {pricing?.map((items) => (
            <li key={items?.id} className="mb-4">
              {items?.text}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
      <SignaturesForm className="mb-4" />
      <p className="font-medium text-black mb-4">
        This Contract and any agreements entered into between PeakTek Roofing &
        Restoration (hereinafter referred to as the “Company” or “PeakTek”) and
        the customer(s) identified herein on the Agreement’s page 1 shall adhere
        to all applicable copyright laws, regulations, and ordinances in the
        state of record.
      </p>
      <h2 className="text-black text-xl font-semibold mb-4">
        Indemnity Statement:
      </h2>
      <p className="font-medium text-black mb-4">
        This Contract and any agreements entered into between PeakTek Roofing &
        Restoration (hereinafter referred to as the “Company” or “PeakTek”) and
        the customer(s) identified herein on the Agreement’s page 1 shall adhere
        to all applicable copyright laws, regulations, and ordinances in the
        state of record
      </p>
      <ul className="list-decimal pl-4 mb-4">
        {contractDetails?.map((items) => (
          <li key={items?.id} className="text-gray-600 mb-3 text-justify">
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
    </Container>
  );
};

export default CustomerAgreement;
