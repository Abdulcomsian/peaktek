import { Input } from "@components/FormControls";
import { Button, DropDown, Loader, SelectInput } from "@components/UI";
import { createSummaryInsurance, getSummaryInsurance } from "@services/apiJobs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function CreateInsuranceInformation() {
  const usersData = useSelector((state) => state?.users?.usersData);
  const userOptions = usersData.map((user) => ({
    value: `${user.id}`,
    label: user.name,
  }));
  const { id: jobId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getSummaryInsurance(jobId);
      console.log("DEfault insurance values", resp.data.job);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data.job;
      }
    },
  });

  const onsubmit = async function (data) {
    console.log(data);
    const resp = await createSummaryInsurance(data, jobId);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(onsubmit)}
      className="bg-stone-200 rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold uppercase">Insurance information</h2>
        <Button
          type="submit"
          variant="gradient"
          className="col-span-full w-fit mt-2 text-sm"
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <Loader width={"24px"} height={"24px"} color="#fff" />
            </div>
          ) : (
            "SAVE"
          )}
        </Button>
      </div>
      <div className="bg-white divide-x-2 divide-stone-300 rounded-2xl p-4 px-3 grid grid-cols-1 sm:grid-cols-[2fr_1.5fr] gap-3 max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3  ">
          <Input
            label="Insurance Company:"
            name="insurance"
            id="insurance"
            className="rounded-2xl col-span-full"
            register={register}
          />
          <Input
            label="Insurance Representative"
            name="insurance_representative"
            id="insurance_representative"
            className="rounded-2xl"
            register={register}
          />
          <Input
            label="Email:"
            type="email"
            name="email"
            id="email"
            className="rounded-2xl"
            register={register}
          />
        </div>
        <div className="px-3 flex flex-col gap-3">
          <Input
            label="Policy Number:"
            type="number"
            name="policy_number"
            id="policy_number"
            className="rounded-2xl"
            register={register}
            min={0}
          />
          <Input
            label="Claim Number:"
            type="number"
            name="claim_number"
            id="claim_number"
            className="rounded-2xl"
            register={register}
          />
        </div>
      </div>
    </form>
  );
}
