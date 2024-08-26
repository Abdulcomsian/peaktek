import { Controller, useForm } from "react-hook-form";
import Header from "../Sidebar/PaymentSchedule/Header";
import PdfOptions from "../Sidebar/PaymentSchedule/PdfOptions";
import { SingleUsePdf, TextPage } from "@components/Payment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPaymentSchedule } from "@store/slices/paymentScheduleSlice";
import { useParams } from "react-router-dom";
import { getPaymentSchedule } from "@services/apiDesignMeeting";
import { RenameFileUI } from "@components/UI";

export default function PaymentScheduleForm() {
  const [selectedOption, setSelectedOption] = useState(1);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async function () {
      const resp = await getPaymentSchedule(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data.data;
      } else {
        return { selectedOption: 1, content: "", acknowledge: false };
      }
    },
  });

  const defaultPdfsFiles = watch("pdfs");

  const handleSwitchClick = (e) => {
    e.stopPropagation();
  };

  const onsubmit = (data) => {
    dispatch(createPaymentSchedule({ ...data, jobId }));
  };

  return (
    <>
      <Controller
        name="acknowledge"
        control={control}
        render={({ field }) => (
          <Header
            onClick={(checked) => field.onChange(checked)}
            wrapperClass="pb-6 border-b border-gray-200"
            defaultChecked={field.value}
          />
        )}
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
          <div>
            <SingleUsePdf register={register} errors={errors} />
            {defaultPdfsFiles ? (
              <RenameFileUI files={defaultPdfsFiles} />
            ) : null}
          </div>
        ) : (
          <TextPage control={control} name="content" errors={errors} />
        )}
      </form>
    </>
  );
}
