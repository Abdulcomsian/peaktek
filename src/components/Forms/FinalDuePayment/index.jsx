import { CheckBox } from "@components/FormControls";
import { useForm } from "react-hook-form";
import PaymentSummary from "../PaymentSummary";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";

export default function FinalDuePayment() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data) {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <CheckBox
          label="fully paid"
          register={register}
          name="is_paid"
          id="is_paid"
        />
        <div className="my-5">
          <h2 className="text-lg font-bold mb-3">Financial summary</h2>
          <PaymentSummary />
        </div>
        <div className="bg-white w-full rounded-2xl p-5 mb-4 lg:mb-0">
          <h2 className="text-lg font-bold mb-3">Notes</h2>
          <CkeditorControlled control={control} name="notes" id="notes" />
        </div>
      </div>
    </form>
  );
}
