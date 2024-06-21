import React from "react";
import { Card } from "@components";
import { FormHeader } from "@components/Forms";
import { Switch } from "antd";

const TermsAndConditions = () => {
  const handleSwitchClick = (e) => {
    console.log("Switch toggled", e);
    e.stopPropagation();
  };

  const termsData = [
    {
      title: "",
      content:
        "By signing this document I/we hereby authorize ______________ (“Company”) to enter my property with the address listed on the Authorization page (“Property”) and perform the roofing work and other services (“Services”) at as set forth in this Contract & the Scope for Roofing Services (“Contract”).",
    },
    {
      title: "1. Scope of Services:",
      content:
        "Company shall provide the services and materials specified in the Scope or a portion thereof as identified in the Scope, Description of Services, and any other services or materials identified below which may be necessary to repair the damage to my property arising out of or discovered as a result of the recent insurable incident (“Claim”).",
    },
    {
      title: "2. Conditions of Insurance",
      content:
        "In no event is Company required to commence the Services until the Insurance Company has approved payment of Insurance Proceeds for the Claim in an amount that is not less than the amount set forth on the Insurance Estimate.",
    },
    {
      title: "3. Payment for Services:",
      content:
        "The approximate cost of the Services are set forth in the Insurance Estimate. Company shall perform the Services in exchange for any applicable Insurance Proceeds, plus any deductible amount which must be paid, in full, by Owner. Company shall not take any action which may be construed as a waiver, rebate, or other form of payment to Owner as compensation for all or part of Owner’s insurance deductible. Notwithstanding any other provision of this Contract, Owner shall pay to Company the cost of any services which are not covered by the Insurance Proceeds and are indicated as such on the Scope.",
    },
    {
      title: "4. Insurance Proceeds:",
      content:
        "“Insurance Proceeds” means any and all benefits, reimbursements, or other payments which are payable by the Insurance Company to Owner for the Services Rendered by Company pursuant to the Claim or any Supplement, as defined below. Company shall also be entitled to payment of any Insurance Proceeds, to the extent such amounts are covered by Owner’s insurance policy, which are payable by Insurance Company for any expenses incurred to repair unforeseen damage/loss discovered while performing the Services (“Supplements”).",
    },
    {
      title: "5. Assignment of Right to Collect Insurance Proceeds:",
      content: `a. Assignment. Owner hereby assigns any and all Insurance Proceeds, including the right to pursue collection of such Insurance Proceeds from the Insurance Company, to Company as part of the consideration for the Services. Owner hereby acknowledges and agrees that the foregoing assignment includes the right for Company to submit invoices, make demands for payment, pursue legal actions, and otherwise pursue claims or take action for the collection of the Insurance Proceeds directly to or against the Insurance Company. The parties acknowledge that this assignment is limited to the Insurance Proceeds, and the rights to pursue any actions or claims to collect the Insurance Proceeds, and does not assign, transfer, or otherwise grant Company any rights to pursue or negotiate the Claim or the insurance coverage related thereto.

      b. Direct Payment Authorization. Owner makes this assignment as part of the consideration for Company’s agreement to perform the Services and hereby agrees to: (i) direct the Insurance Company to release any and all estimates, costs, or other payment information related to the Claim, Insurance Proceeds, and any Supplement, to Company, but only to the extent such information pertains to the Services and/or Company’s operations; (ii) permit the Company to discuss the scope of Services and the Insurance Proceeds directly with the Insurance Company, to the extent Company is permitted to do so by applicable law; and (iii) waive any privacy rights related to the foregoing.

      c. Right to Pursue Legal Action Against Insurance Company. Company shall, in its sole discretion and expense, be entitled to take any reasonable actions necessary, including, but not limited to, making demands for payment, pursuing legal actions in court, and otherwise pursuing claims and taking action against the Insurance Company to collect the Insurance Proceeds owed to Company pursuant to this Contract. Upon Company’s request, Owner agrees to provide any relevant information and, to the extent reasonably necessary, assist Company in pursuing a claim or other action against the Insurance Company in the event the Insurance Company fails to pay the total amount of Insurance Proceeds owed to Company pursuant to the terms of this Contract.`,
    },
    {
      title: "6. Term & Termination:",
      content:
        "Either party may terminate this Contract in the event the other party materially breaches the terms set forth herein. Owner may terminate this Contract in the event the Insurance Company denies payment for the Claim; provided Owner gives Company written notice of termination within three (3) days of the Owner learning of such denial. However, Owner shall not be entitled to the foregoing termination right in the event the denial pertains only to a Supplement and not the entire Claim and Owner shall be entitled retain any amounts received as payment for Services rendered. Further, Owner has the right to terminate this Contract, for any reason, within three (3) days of signing this Contract, and Company shall make a full refund of any deposits paid by Owner upon receiving notice thereof.",
    },
    {
      title: "7. Liability:",
      content:
        "Owner hereby agrees to release, indemnify, defend, and hold Company harmless from any claims, damages, lawsuits (including attorney’s fees) or other expenses related to Owner’s negligence or Owner’s breach of this Contract. IN NO EVENT SHALL COMPANY’S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS CONTRACT, WHETHER ARISING OUT OF OR RELATED TO BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, EXCEED THE AGGREGATE AMOUNTS PAID TO COMPANY BY OWNER HEREUNDER.",
    },
    {
      title: "8. Miscellaneous:",
      content: `a. Notices. All notices sent by one party to the other party in connection with this Contract must be in writing.

      b. Severability. If any term or provision of this Contract is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable in any jurisdiction, such provision shall be excluded from this Contract and the other terms shall remain in full force and effect.

      c. Entire Agreement. This Contract and any Exhibits attached hereto constitute the entire agreement between the parties pertaining to the Services and supersedes all prior and contemporaneous agreements, proposals, quotes, representations, or other understanding of the parties. No supplement, modification, or amendment of this Contract shall be binding unless executed in writing by duly authorized representatives of both parties.

      d. Fees & Interest. In the case that proceeds owed are not paid and Owner is sent to a Collections, Company reserves the right to add the fees and interest ensued through the collections process to the remainder of the portion due.

      e. Dispute Debt. Owner has 15-30 days from final Invoice to dispute debt in writing and sent to Company.

      f. In the event your account is assigned to a collection agency, you agree to pay a collection fee in the amount equal to 30% of the balance due assigned to the collection agency.`,
    },
  ];

  return (
    <div>
      <FormHeader
        className=""
        btnText="View Page"
        pageTitle="Terms and Conditions"
      />
      <Card className="px-8 py-6 flex justify-between mb-4">
        <div>
          <h2 className="font-semibold text-black text-base mb-2">
            Require customers to acknowledge this page
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            They will be asked during the signing process
          </p>
        </div>
        <Switch className="ml-4" onClick={handleSwitchClick} />
      </Card>
      <Card className="px-8 py-6 mb-4">
        {termsData.map((item, index) => (
          <div key={index} className="mb-4">
            {item.title && (
              <h3 className="font-semibold text-black text-base mb-2">
                {item.title}
              </h3>
            )}
            <p className="text-gray-800 text-sm">{item.content}</p>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default TermsAndConditions;
