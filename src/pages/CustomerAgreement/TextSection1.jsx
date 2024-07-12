import { acknowledgement, insurance, pricing } from "@assets/data";
import TitledSection from "@components/UI/TitledSection";
export default function TextSection1() {
  return (
    <>
      <TitledSection title="ACKNOWLEDGEMENTS">
        <ul className="list-disc pl-6">
          {acknowledgement?.map((items) => (
            <li key={items?.id} className="mb-2 text-sm">
              {items?.text}
            </li>
          ))}
        </ul>
      </TitledSection>
      <TitledSection title="INSURANCE">
        <ul>
          {insurance?.map((items) => (
            <li key={items?.id} className="mb-4 text-sm">
              {items?.text}
            </li>
          ))}
        </ul>
      </TitledSection>
      <TitledSection title="PRICING">
        <ul>
          {pricing?.map((items) => (
            <li key={items?.id} className="mb-4 text-sm">
              {items?.text}
            </li>
          ))}
        </ul>
      </TitledSection>
    </>
  );
}
