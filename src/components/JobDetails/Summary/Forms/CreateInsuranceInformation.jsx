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
    value: user.id,
    label: user.name,
  }));
  const { id: jobId } = useParams();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getSummaryInsurance(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data.job;
      }
      console.log(resp);
    },
  });

  const onsubmit = async function (data) {
    console.log(data);
    const resp = await createSummaryInsurance(data, jobId);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
    }
    console.log(resp);
  };
  return (
    <form action="" onSubmit={handleSubmit(onsubmit)}>
      <div className="bg-white rounded-2xl py-4 px-3 grid grid-cols-2 gap-3 max-w-screen-xl mb-4">
        <h2 className="col-span-full text-stone-500 font-semibold uppercase">
          Insurance information
        </h2>
        <Input
          label="Insurance:"
          name="insurance"
          className="rounded-2xl"
          register={register}
        />
        <Input
          label="Policy#:"
          type="number"
          name="policy_number"
          className="rounded-2xl"
          register={register}
        />
        <Input
          label="Email:"
          type="email"
          name="email"
          className="rounded-2xl"
          register={register}
        />
        <DropDown
          vertical={true}
          control={control}
          label="Insurance Representative"
          labelClass="font-medium text-sm"
          name="insurance_representative"
          id="insurance_representative"
          options={userOptions}
          placeholder="Select an option"
          rules={{ required: "This field is required" }} // Optional validation rules
        />
        <Button
          type="submit"
          variant="gradient"
          className="col-span-full w-fit mt-2"
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
    </form>
  );
}
