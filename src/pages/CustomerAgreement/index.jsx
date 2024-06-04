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
    },
    {
      id: 2,
      text: "The Customer designates PeakTek as the sole contractor responsible for completing the work, ensuring compliance with all local, state, federal, code, and safety regulations. Additionally, the Customer accepts responsibility for any expenses not covered by insurance, including but not limited to work portions, deductibles, enhancements, depreciation, or additional work requested by the Customer. Such payments must be settled within thirty (30) days of written notification from PeakTek.",
    },
  ];
  const Pricing = [
    {
      id: 1,
      text: "Price Agreeable encompasses all funds paid or agreed upon as outlined in the Claim, including but not limited to the Insurance Deductible, Actual Cash Value, Replacement Cost Value, Recoverable Depreciation, Supplements, change orders, profit, overhead, markups, and/or margin.",
    },
    {
      id: 2,
      text: "The undersigned parties hereby consent to the terms stipulated in the aforementioned Agreement and any supplementary terms and conditions detailed on the reverse side herein.",
    },
    {
      id: 3,
      text: "IN WITNESS WHEREOF, the undersigned parties have willingly and voluntarily caused the execution of this Agreement, either individually or by their duly authorized representative, on the effective date of acceptance indicated below.",
    },
  ];
  const contractDetails = [
    {
      id: 1,
      content:
        "This Contract and any agreements made pursuant thereto between PeakTek Roofing & Restoration (referred to as the 'Co.' or 'Company' or 'PeakTek') and the customer(s) named herein on the Agreement’s page 1 will be subject to all appropriate laws, regulations, and ordinances in the state of record.",
    },
    {
      id: 2,
      content:
        "In the event of default in payment under this contract, charges shall be applied from the date thereof at a rate equivalent to the greater of one and one-half percent (1.5%) per month (18% per annum), with a minimum charge of $20.00 per month or the maximum amount permitted by law. If legal action is required for collection, the Customer shall bear all attorney's fees and associated costs.",
    },
    {
      id: 3,
      content:
        "PeakTek Roofing & Restoration ('the Company') disclaims responsibility for damages arising from rain, fire, tornadoes, windstorms, or other perils unless specifically agreed upon in writing before commencing work or covered by homeowner's insurance or business risk insurance.",
    },
    {
      id: 4,
      content:
        "Unless stated otherwise in the contract, replacement of deteriorated decking, fascia boards, roof jacks, ventilators, flashing, or other materials is not included and will be billed separately on a time and material basis.",
    },
    {
      id: 5,
      content:
        "After 90 days, the Company reserves the right to adjust the price based on current costs, such as material expenses.",
    },
    {
      id: 6,
      content:
        "The Company shall not be liable for performance failures due to uncontrollable circumstances such as labor disputes, strikes, fires, pandemics, wars, riots, protests, supply shortages, weather, or other events beyond its control.",
    },
    {
      id: 7,
      content:
        "The Company is not responsible for any damage on or below the roof due to leaks, excessive wind-driven rain, ice, or hail during the period of warranty. EXCESSIVE WIND is 50 M.P.H. or faster.",
    },
    {
      id: 8,
      content:
        "In case of material reorder or restocking due to customer cancellation, a restocking fee equal to fifteen percent (15%) of the contract price will be applied. The Company disclaims liability for any mold, mildew or interior damage resulting from prior leaks.",
    },
    {
      id: 9,
      content:
        "Cancellation of this contract later than 5 days from execution incurs a fee of $200.00 per person per hour expended in property evaluation or $2,000.00, whichever is greater, as liquidated damages.",
    },
    {
      id: 10,
      content:
        "Once work has commenced, this contract cannot be canceled except by mutual written agreement.",
    },
    {
      id: 11,
      content:
        "If any provision of this contract is deemed invalid or unenforceable, the remaining provisions shall remain unaffected.",
    },
    {
      id: 12,
      content:
        "Any verbal communications outside this contract are deemed immaterial and not relied upon by either party.",
    },
    {
      id: 13,
      content:
        "During work, the customer's homeowner's insurance is responsible for interior damage if the Company has protected the roof adequately.",
    },
    {
      id: 14,
      content:
        "The Company disclaims responsibility for any damage to solar panels during repairs.",
    },
    {
      id: 15,
      content:
        "The Company is not liable for construction issues of the customer's home unless notified and specified in writing.",
    },
    {
      id: 16,
      content:
        "The Company disclaims responsibility for damage from leaks from skylights unless it completes the skylight replacement.",
    },
    {
      id: 17,
      content:
        "Warranty periods are specified for different types of work, and extended service warranties are available for additional charges.",
    },
    {
      id: 18,
      content:
        "Payments are to be made in accordance with the agreed terms, with insurance checks to be endorsed to the Company promptly.",
    },
    {
      id: 19,
      content:
        "Additional labor or material costs due to hidden conditions or building code issues require a signed change order.",
    },
    {
      id: 20,
      content:
        "The Company is not responsible for fixing existing framing issues unless necessary, on a time and material basis.",
    },
    {
      id: 21,
      content:
        "All insurance proceeds for approved repairs are to be paid to the Company unless stated otherwise in writing.",
    },
    {
      id: 22,
      content:
        "Customers are required to pay in full upon completion of the project.",
    },
    {
      id: 23,
      content:
        "Customers have the right to cancel the contract within three business days of being notified by their insurer that the claim or contract is not covered, except for emergency repairs already completed.",
    },
    {
      id: 24,
      content:
        "Customers must inform the Company of any property covenants, conditions, or restrictions, as the Company is not liable unless notified in writing and reference is made in the contract terms.",
    },
  ];

  return (
    <Container className="my-4 mx-6 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        Customer Information
      </h1>
      <CustomerInformationForm />
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black mb-2">
          ACKNOWLEDGEMENTS
        </h2>
        <ul className="list-disc pl-6">
          {Acknowledgement?.map((items) => (
            <li key={items?.id} className="mb-2">
              {items?.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black mb-2">INSURANCE</h2>
        <ul>
          {Insurance?.map((items) => (
            <li key={items?.id} className="mb-4">
              {items?.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black mb-2">PRICING</h2>
        <ul>
          {Pricing?.map((items) => (
            <li key={items?.id} className="mb-4">
              {items?.text}
            </li>
          ))}
        </ul>
      </div>
      <h2 className="text-black text-xl font-semibold mb-4">SIGNATURES</h2>
      <SignaturesForm />
      {contractDetails?.map((items) => (
        <p key={items?.id} className="mb-3">
          {items?.content}
        </p>
      ))}
    </Container>
  );
};

export default CustomerAgreement;
