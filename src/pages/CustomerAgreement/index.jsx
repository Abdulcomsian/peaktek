import React from "react";
import CustomerInformationForm from "../../components/Forms/CustomerInformation";
import Container from "../../components/Container";
import SignaturesForm from "../../components/Forms/Signatures";
import {
  acknowledgement,
  insurance,
  pricing,
  contractDetails,
} from "../../assets/data";
const CustomerAgreementPage = () => {
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        Customer Information
      </h1>
      <CustomerInformationForm />
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
        The homeowner shall not be held liable for any injuries, accidents, or
        damages that occur on the property during the re-roof project. PeakTek
        Roofing & Restoration assumes full responsibility for all job site
        accidents and incidents, ensuring coverage through our workers'
        compensation insurance and any other applicable insurance policies.
      </p>
      {contractDetails?.map((items) => (
        <p key={items?.id} className="mb-3">
          {items?.content}
        </p>
      ))}
    </Container>
  );
};

export default CustomerAgreementPage;
