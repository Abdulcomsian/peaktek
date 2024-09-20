import { Input } from "@components/FormControls";
import { getCoc } from "@services/apiCOC";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function InsuranceInfo() {
  const { id: jobId } = useParams();
  const { register } = useForm({
    defaultValues: async () => {
      const resp = await getCoc(jobId);
      console.log("COC REPSS", resp);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
      return {};
    },
  });

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-5">
      <Input
        register={register}
        name="homeowner_name"
        id="homeowner_name"
        label="Homeowner Name"
        disabled={true}
      />
      <Input
        register={register}
        name="homeowner_email"
        id="homeowner_email"
        type="email"
        label="Homeowner Email"
        disabled={true}
      />
      <Input
        register={register}
        name="homeowner_address"
        label="Address"
        className="col-span-full"
        disabled={true}
      />
      <Input
        register={register}
        name="insurance"
        label="Insurance"
        disabled={true}
      />
      <Input
        register={register}
        name="policy_number"
        label="Policy #"
        disabled={true}
      />
      <Input
        register={register}
        name="insurance_email"
        type="email"
        label="Email"
        disabled={true}
      />
      <Input
        register={register}
        name="claim_number"
        label="Claim #"
        disabled={true}
      />
    </form>
  );
}
