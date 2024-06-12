import React from "react";

import { Container } from "@components";

import {
  SignaturesForm,
  InspectionForm,
  CustomerInformationForm,
} from "@components/Forms";

const CommissionAgreement = () => {
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        CUSTOMER INFORMATION
      </h1>
      <CustomerInformationForm className="" />
      <h2 className="text-lg font-semibold text-black mb-2">
        PHASE 1: INITIAL INSPECTION AND SIGNED CONTRACT
      </h2>
      <InspectionForm />
      <h2 className="text-lg font-semibold text-black mb-2">
        PHASE 2: ADJUSTER APPOINTMENT AND APPROVAL
      </h2>
      <InspectionForm />
      <h2 className="text-lg font-semibold text-black mb-2">
        PHASE 3: NEGOTIATION AND BUILD PAPERWORK
      </h2>
      <InspectionForm />
      <h2 className="text-lg font-semibold text-black mb-2">
        PHASE 4: BUILD DAY AND PAYMENT PICK UP
      </h2>
      <InspectionForm />
      <h2 className="text-lg font-semibold text-black mb-2">
        PHASE 4: BUILD DAY AND PAYMENT PICK UP
      </h2>
      <InspectionForm className="mb-4" />
      <h2 className="text-lg font-semibold text-black mb-2">
        ALTERNATE SPLIT METHODS
      </h2>
      <InspectionForm />
      <h2 className="text-lg font-semibold text-black mb-2">
        INDEPENDENT JOB COMPLETION
      </h2>
      <InspectionForm />
      <h2 className="text-lg font-semibold text-black mb-2">SIGNATURES</h2>
      <SignaturesForm />
    </Container>
  );
};

export default CommissionAgreement;
