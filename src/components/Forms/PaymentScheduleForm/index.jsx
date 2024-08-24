import { useForm } from "react-hook-form";
import Header from "../Sidebar/PaymentSchedule/Header";
import PdfOptions from "../Sidebar/PaymentSchedule/PdfOptions";
import { SingleUsePdf, TextPage } from "@components/Payment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPaymentSchedule } from "@store/slices/paymentScheduleSlice";
import { useParams } from "react-router-dom";

export default function PaymentScheduleForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { selectedOption: 1, content: "" } });
  const [selectedOption, setSelectedOption] = useState(1);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const handleSwitchClick = (e) => {
    e.stopPropagation();
  };

  const onsubmit = (data) => {
    dispatch(createPaymentSchedule({ ...data, jobId }));
  };

  return (
    <>
      <Header
        onClick={handleSwitchClick}
        wrapperClass="pb-6 border-b border-gray-200"
      />
      <form className="py-8 md:py-0" onSubmit={handleSubmit(onsubmit)}>
        <PdfOptions
          control={control}
          name="selectedOption"
          verticle={true}
          onOptionSelected={setSelectedOption}
          className="py-6 border-b border-gray-200"
        />
        {selectedOption === 1 ? (
          <SingleUsePdf register={register} errors={errors} />
        ) : (
          <TextPage control={control} name="content" errors={errors} />
        )}
      </form>
    </>
  );
}
