import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { Button } from "@components/UI";
import { useForm } from "react-hook-form";
import { CustomDatePicker } from "@components/FormControls";
import { ThreeDots } from "react-loader-spinner";
import {
  getWonAndCloseInfo,
  updateWonAndCloseInfo,
} from "@services/apiWonAndClosed";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ButtonSave from "@components/UI/ButtonSave";

export default function WonAndClosed() {
  const { id: jobId } = useParams();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isLoading, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getWonAndCloseInfo(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data.data;
      }
    },
  });

  const closedDate = getValues().closed_date;

  const onSubmit = async function (data) {
    console.log(data);
    const resp = await updateWonAndCloseInfo(data, jobId);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
    }
  };

  if (isLoading)
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#18faf8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="flex item-center justify-center"
      />
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 bg-white p-5 rounded-2xl">
        <CustomDatePicker
          disabled={false}
          control={control}
          name="closed_date"
          label="Closed Date:"
          className="mb-4 md:mb-0 !w-[50%]"
          defaultValue={closedDate}
          //   defaultValue={defaultValue?.customer_date}
        />
        <CkeditorControlled
          control={control}
          name="notes"
          id="notes"
          label="Notes:"
        />
        <ButtonSave isLoading={isSubmitting} />
      </div>
    </form>
  );
}
