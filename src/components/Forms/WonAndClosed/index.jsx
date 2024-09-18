import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { Button } from "@components/UI";
import { useForm } from "react-hook-form";
import { CustomDatePicker } from "@components/FormControls";

export default function WonAndClosed() {
  const { control, handleSubmit } = useForm();

  const onSubmit = function (data) {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 bg-white p-5 rounded-2xl">
        <CustomDatePicker
          disabled={false}
          control={control}
          name="customer_date"
          label="Closed Date:"
          className="mb-4 md:mb-0 !w-[50%]"
          //   defaultValue={defaultValue?.customer_date}
        />
        <CkeditorControlled
          control={control}
          name="date"
          id="date"
          label="Notes:"
        />
        <Button type="submit" variant="gradient" className="">
          Save
        </Button>
      </div>
    </form>
  );
}
