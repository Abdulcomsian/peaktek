import React from "react";
import Container from "@components/Container";
import CustomerInformationForm from "@components/Forms/CustomerInformation";
import JobCostForm from "@components/Forms/JobCost";
import ProjectSummaryForm from "@components/Forms/ProjectSummary";
import Input from "@components/Input";
import SignaturesForm from "@components/Forms/Signatures";
const CertificateOfCompletion = () => {
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4 uppercase">
        Customer Information
      </h1>
      <CustomerInformationForm className="mb-4" />

      <div className="flex flex-col md:flex-row  justify-between">
        <div className="w-full md:pr-8">
          <h2 className="text-black text-lg font-semibold mb-2 uppercase">
            CERTIFICATE OF COMPLETION
          </h2>
          <p className="text-gray-600 mb-4 text-base text-justify">
            This certificate of completion is hereby awarded to for the
            successful completion of the loss stated above. This project was
            completed by PEAKTEK ROOFING & RESTORATION, a contractor in the
            state of Tennessee, in accordance with all relevant building codes.
            We certify that all work on this project was completed in compliance
            with Tennessee code. Our team of qualified professionals ensured
            that all work was done to the highest standards and met all relevant
            codes and regulations.
          </p>
          <h2 className="font-semibold mb-2 text-lg">Depreciation: </h2>
          <p className="text-gray-600 mb-4 text-base text-justify">
            We request that the depreciation on this loss claim be released to
            PeakTek Roofing & Restoration as the work assigned by the customer
            to PeakTek has been completed and meets all requirements set forth
            by the insurance scope. We have thoroughly inspected the completed
            work and ensured that it meets all of the standards.
          </p>
          <h2 className="font-semibold mb-2">Overhead and Profit: </h2>
          <p className="text-gray-600 mb-4 text-base text-justify">
            We also request that overhead and profit be included in the final
            claim settlement. This is in compliance with Tennessee law, which
            requires that overhead and profit be included in the final project
            cost. Our team of experts worked to ensure that all aspects of the
            project were completed to the highest standards, and we believe that
            our work deserves to be compensated fairly.
          </p>
        </div>
        <JobCostForm className="px-6 py-4 rounded-md" />
      </div>
      <h2 className="text-black text-lg font-semibold mb-2 uppercase">
        PROJECT SUMMARY
      </h2>
      <ProjectSummaryForm />
      <h2 className="text-black text-lg font-semibold mb-2 uppercase">
        CONCLUSION
      </h2>
      <p>
        We would like to thank for the opportunity to work on this project. We
        take great pride in our work and are pleased to have been able to
        provide quality construction services. We believe that the completed
        work meets all requirements set forth by the insurance policy and
        Tennessee law, and we request that the depreciation be released and
        overhead and profit be included in the final claim settlement.
      </p>
      <div className="mb-4">
        <span className="block mb-2">Sincerely,</span>
        <Input className="w-full md:max-w-sm" />
      </div>
      <h2 className="text-black text-lg font-semibold mb-2 uppercase">
        SIGNATURES
      </h2>
      <SignaturesForm />
    </Container>
  );
};

export default CertificateOfCompletion;
