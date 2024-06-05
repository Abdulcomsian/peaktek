import React from "react";
import CustomerInformationForm from "../../components/Forms/CustomerInformation";
import Container from "../../components/Container";
const WarrantyInformationPage = () => {
  const warrantyDuration = [
    {
      id: 1,
      text: "This warranty is valid for a period of two (2) years from the date of project completion.",
    },
  ];
  const notificationOfIssuance = [
    {
      id: 1,
      text: "The owner shall notify PeakTek Roofing & Restoration of any leak, defect, failure, or deficiency discovered within ten (10) days of discovery. If covered by this warranty, PeakTek shall have the right to inspect and repair the issue immediately. If not covered, PeakTek may inspect and repair the problem with the owner's written authorization and at the owner's expense. PeakTek reserves the right to inspect the roof annually during the warranty term. Payment according to the contract terms constitutes the sole consideration for this warranty. Failure to make payment as per contract terms voids this warranty.",
    },
  ];
  const damageData = [
    {
      id: 1,
      text: "Damage caused by fire, building settling, distortions, or failures, natural causes (floods, lightning, high winds, hail, hurricanes, tornadoes, earthquakes), or extraordinary events",
    },
    {
      id: 2,
      text: "Damage from cracks or openings in the roof substrate, walls, partitions, foundations, etc",
    },
    {
      id: 3,
      text: "Damage from vandalism, penetration, foreign objects or agents, including plant or animal life",
    },
    {
      id: 4,
      text: "Damage from alterations, additions, encroachments, or improper use of the roof, including snow shoveling, heat cables, salt, etc",
    },
  ];
  const limitationsOfLiability = [
    {
      id: 1,
      description:
        "No implied warranty of merchantability or fitness in connection with supplied roof materials.",
    },
    {
      id: 2,
      description:
        "PeakTek is not liable for damage to the building or contents, or for loss, injury, or damage to persons or property from defects in materials supplied.",
    },
    {
      id: 3,
      description:
        "PeakTek is not liable for incidental, special, or consequential damages, direct or indirect.",
    },
    {
      id: 4,
      description: "Additional Terms:",
    },
    {
      id: 5,
      description:
        "No modifications to this warranty are effective unless in writing and approved by all parties.",
    },
    {
      id: 6,
      description:
        "This warranty represents the sole and exclusive liability of PeakTek for the roofing job, including application, maintenance, and repair.",
    },
    {
      id: 7,
      description:
        "THIS WARRANTY REPLACES ALL OTHER WARRANTIES, WRITTEN, ORAL, EXPRESSED, OR IMPLIED, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.",
    },
    {
      id: 8,
      description:
        "This warranty is effective only when executed by an authorized PeakTek representative.",
    },
    {
      id: 9,
      description:
        "This warranty is not a substitute for a common-sense maintenance program by the owner and does not cover roof abuse from foot traffic or other trades.",
    },
  ];

  return (
    <Container className="my-4 mx-6 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        CUSTOMER INFORMATION
      </h1>
      <CustomerInformationForm />
      <h2 className="text-black text-lg font-semibold mb-2">
        Warranty Duration:
      </h2>
      <ul className="list-disc pl-6">
        {warrantyDuration?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
      <h2 className="text-black text-lg font-semibold mb-2">
        Notification of Issues:
      </h2>
      <ul className="list-disc pl-6">
        {notificationOfIssuance?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
      <h2 className="text-black text-lg font-semibold mb-2">
        Exclusions to Coverage:
      </h2>
      <ul className="list-disc pl-6">
        {damageData?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default WarrantyInformationPage;
