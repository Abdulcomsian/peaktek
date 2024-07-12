import { contractDetails } from "@assets/data";
import TitledSection from "@components/UI/TitledSection";

export default function TextSection2() {
  return (
    <>
      <TitledSection>
        <p className="font-medium text-sm mb-4">
          This Contract and any agreements entered into between PeakTek Roofing
          & Restoration (hereinafter referred to as the “Company” or “PeakTek”)
          and the customer(s) identified herein on the Agreement’s page 1 shall
          adhere to all applicable copyright laws, regulations, and ordinances
          in the state of record.
        </p>
      </TitledSection>
      <TitledSection title="Indemnity Statement:">
        <p className="font-medium text-sm mb-4">
          This Contract and any agreements entered into between PeakTek Roofing
          & Restoration (hereinafter referred to as the “Company” or “PeakTek”)
          and the customer(s) identified herein on the Agreement’s page 1 shall
          adhere to all applicable copyright laws, regulations, and ordinances
          in the state of record
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
    </>
  );
}
