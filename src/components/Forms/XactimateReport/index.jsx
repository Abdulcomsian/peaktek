import { useForm, Controller } from "react-hook-form";
import Header from "../Sidebar/PaymentSchedule/Header";
import PdfOptions from "../Sidebar/PaymentSchedule/PdfOptions";
import { SingleUsePdf, TextPage } from "@components/Payment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createXactimatereport,
  getXactimatereport,
} from "@services/apiDesignMeeting";

export default function RoofComponent() {
  const { id: jobId } = useParams();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async function () {
      const resp = await getXactimatereport(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        console.log(resp);
      } else {
        return { selectedOption: 1, content: "", acknowledge: false };
      }
    },
  });

  const [selectedOption, setSelectedOption] = useState(1);
  const dispatch = useDispatch();
  const { formError } = useSelector((store) => store.roofer);

  const onsubmit = (data) => {
    console.log(data);
    dispatch(createXactimatereport({ ...data }, jobId));
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
          <SingleUsePdf register={register} errors={errors} />
        ) : (
          <TextPage control={control} name="content" errors={errors} />
        )}
      </form>
    </>
  );
}
