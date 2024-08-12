import { useForm } from "react-hook-form";
import Header from "../Sidebar/PaymentSchedule/Header";
import PdfOptions from "../Sidebar/PaymentSchedule/PdfOptions";
import { MyPdfs, SharedPdf, SingleUsePdf, TextPage } from "@components/Payment";
import { Button } from "@components/UI";
import { useState } from "react";

const renderContent = (selectedOption) => {
  switch (selectedOption) {
    case 1:
      return <MyPdfs />;
    case 2:
      return <SharedPdf />;
    case 3:
      return <SingleUsePdf />;
    case 4:
      return <TextPage initialEditorData={initialEditorData} />;
    default:
      return "Select an option to see content";
  }
};

export default function PaymentScheduleForm() {
  const [selectedOption, setSelectedOption] = useState(1);
  const { control, handleSubmit } = useForm({
    defaultValues: { selectedOption: 1 },
  });

  const handleSwitchClick = (e) => {
    e.stopPropagation();
  };

  function onSubmit(data) {
    console.log("DATA FROM THE PAYMENT SCHEDULE", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-8 md:py-0">
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
      <Button type="submit" variant="gradient" className="mt-4">
        Save
      </Button>
    </form>
  );
}
