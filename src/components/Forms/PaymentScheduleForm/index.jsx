import { useForm } from "react-hook-form";
import Header from "../Sidebar/PaymentSchedule/Header";
import PdfOptions from "../Sidebar/PaymentSchedule/PdfOptions";
import { MyPdfs, SharedPdf, SingleUsePdf, TextPage } from "@components/Payment";
import { Button } from "@components/UI";
import { useState } from "react";

const renderContent = (selectedOption) => {
  switch (selectedOption) {
    case 1:
      return <SingleUsePdf />;
    case 2:
      return <TextPage />;
    default:
      return "Select an option to see content";
  }
};

export default function PaymentScheduleForm() {
  const { control } = useForm({ defaultValues: { selectedOption: 1 } });
  const [selectedOption, setSelectedOption] = useState(1);

  const handleSwitchClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="py-8 md:py-0">
      <Header
        onClick={handleSwitchClick}
        wrapperClass="pb-6 border-b border-gray-200"
      />
      <PdfOptions
        control={control}
        name="selectedOption"
        verticle={true}
        onOptionSelected={setSelectedOption}
        className="py-6 border-b border-gray-200"
      />
      <div className="pt-6">{renderContent(selectedOption)}</div>
    </div>
  );
}
