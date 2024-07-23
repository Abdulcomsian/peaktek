import { CustomerInformationForm, SignaturesForm } from "@components/Forms";
import TextSection1 from "@pages/CustomerAgreement/TextSection1";
import TextSection2 from "@pages/CustomerAgreement/TextSection2";
import React, { Fragment } from "react";

const CustomerAgreementForm = () => {
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <h1 className="font-poppins font-medium text-xl text-center mb-4 md:mb-0">
          Customer Agreement
        </h1>
        <div className="flex items-center justify-center gap-6">
          <button className="font-poppins font-medium text-base text-white btn-gradient  px-4 py-1 rounded-md">
            Sign Now
          </button>
          <button className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md">
            Send for Approval
          </button>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Customer Information
        </h2>
        <CustomerInformationForm />
        <TextSection1 />
        <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
        {/* <SignaturesForm /> */}

        <TextSection2 />
      </div>
    </Fragment>
  );
};

export default CustomerAgreementForm;
