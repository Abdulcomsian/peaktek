import React from "react";
import CustomerInformationForm from "../../components/Forms/CustomerInformation";
import Container from "../../components/Container";
import SignaturesForm from "../../components/Forms/Signatures";

const CustomerAgreement = () => {
  const Acknowledgement = [
    {
      id: 1,
      text: "Customer affirms and acknowledges ownership of the property situated at the address provided above and asserts authorization and competency to engage in this Agreement.",
    },
    {
      id: 2,
      text: "PeakTek Roofing & Restoration ('PeakTek') will supply materials, equipment, and labor, either directly or through independent contractors, as outlined herein (the 'Work').",
    },
    {
      id: 3,
      text: "Customer has enlisted PeakTek as the chosen contractor due to PeakTek's expertise and its licensing, bonding, and insurance. Customer comprehends that PeakTek will proceed with the Work and associated tasks related to the insurance claim included within this agreement, relying on this agreement as a foundation.",
    },
  ];
  const Insurance = [
    {
      id: 1,
      text: "Both parties acknowledge that, except for deductible and upgrade costs, payment for the Work may be facilitated by the Customer's insurer. However, the Customer acknowledges the necessity to assess any property damage separately. The Customer grants authorization for PeakTek Roofing & Restoration (hereafter referred to as PeakTek to allocate its time and expertise to aid in evaluating damages and providing repair or replacement recommendations, potentially covered under an insurance claim, subject to the approval of the Customer's insurer.",
      id: 2,
      text: "The Customer designates PeakTek as the sole contractor responsible for completing the work, ensuring compliance with all local, state, federal, code, and safety regulations. Additionally, the Customer accepts responsibility for any expenses not covered by insurance, including but not limited to work portions, deductibles, enhancements, depreciation, or additional work requested by the Customer. Such payments must be settled within thirty (30) days of written notification from PeakTek.",
    },
  ];
  const Pricing = [
    {
      id: 1,
      text: "Price Agreeable encompasses all funds paid or agreed upon as outlined in the Claim, including but not limited to the Insurance Deductible, Actual Cash Value, Replacement Cost Value, Recoverable Depreciation, Supplements, change orders, profit, overhead, markups, and/or margin.",
      id: 2,
      text: "The undersigned parties hereby consent to the terms stipulated in the aforementioned Agreement and any supplementary terms and conditions detailed on the reverse side herein.",
      id: 3,
      text: "IN WITNESS WHEREOF, the undersigned parties have willingly and voluntarily caused the execution of this Agreement, either individually or by their duly authorized representative, on the effective date of acceptance indicated below.",
    },
  ];
  return (
    <Container className="my-4 mx-6 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        Customer Information
      </h1>
      <CustomerInformationForm />
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black">ACKNOWLEDGEMENTS</h2>
        <ul className="list-disc pl-6">
          {Acknowledgement?.map((items) => (
            <li key={items?.id} className="mb-2">
              {items?.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black">INSURANCE</h2>
        <ul>
          {Insurance?.map((items) => (
            <li key={items?.id}>{items?.text}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black">PRICING</h2>
        <ul>
          {Pricing?.map((items) => (
            <li key={items?.id}>{items?.text}</li>
          ))}
        </ul>
      </div>
      <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
      <SignaturesForm />
    </Container>
  );
};

export default CustomerAgreement;
