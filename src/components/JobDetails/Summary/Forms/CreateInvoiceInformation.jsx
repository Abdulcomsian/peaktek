import { Input } from "@components/FormControls";
import { Button, DropDown, SelectInput } from "@components/UI";
import { useAuth } from "@context/AuthContext";
import {
  createSummaryInitialInformation,
  getSummaryInitialInformation,
} from "@services/apiJobs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@components/UI";

const marketOptions = [
  { label: "Nashville", value: "Nashville" },
  { label: "Chattanooga", value: "Chattanooga" },
];

const leadSources = [
  { label: "Door Knocking", value: "Door Knocking" },
  { label: "Customer Referral", value: "Customer Referral" },
  { label: "Call In", value: "Call In" },
  { label: "Facebook", value: "Facebook" },
  { label: "Family Member", value: "Family Member" },
  { label: "Home Advisor", value: "Home Advisor" },
  { label: "Website", value: "Website" },
  { label: "Social Encounter", value: "Social Encounter" },
];

export default function CreateInvoiceInformation() {
  const { id: jobId } = useParams();
  const [address, setAddress] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const usersData = useSelector((state) => state?.users?.usersData);
  const userOptions = usersData.map((user) => ({
    value: `${user.id}`,
    label: user.name,
  }));

  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm({
    defaultValues: async () => {
      const resp = await getSummaryInitialInformation(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        setAddress(resp.data.job.address);
        return resp.data.job; // Ensure job object matches form fields
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    },
  });

  const onSubmit = async (data) => {
    const resp = await createSummaryInitialInformation(data, jobId);
    console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
    }
    if (resp.status === 401) {
      logout();
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-stone-200 rounded-2xl py-4 px-3  max-w-screen-xl">
        <div className="col-span-full flex items-center justify-between">
          <span className="font-semibold uppercase">Profile Summary</span>
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
        <div className="bg-white rounded-2xl grid grid-cols-1 sm:grid-cols-2  gap-3 py-7 px-5 mt-4">
          <div className=" col-span-full">
            <label className="font-medium text-sm inline-block">Address</label>
            <input
              type="text"
              name="address"
              className="w-full py-2 px-3 text-sm rounded-md border border-stone-300"
              disabled={true}
              value={address}
            />
          </div>
          <Input
            label="PeakTek:"
            placeholder="00-000-0000-00000"
            type="text"
            name="invoice_number"
            className="rounded-2xl"
            register={register}
            required={false}
            error={errors?.invoice_number}
          />
          <SelectInput
            label="Sales Representative"
            control={control}
            placeholder="Select options"
            name="user_ids"
            options={userOptions}
            labelClass="font-medium text-sm"
            rules={{ required: "This field is required" }}
          />
          <DropDown
            vertical={true}
            control={control}
            label="Market"
            labelClass="font-medium text-sm"
            name="market"
            id="market"
            options={marketOptions}
            placeholder="Select an option"
            rules={{ required: "This field is required" }}
          />
          <DropDown
            vertical={true}
            control={control}
            name="lead_source"
            label="Lead Source:"
            labelClass="font-medium text-sm"
            id="lead_source"
            options={leadSources}
            placeholder="Select an option"
            rules={{ required: "This field is required" }}
          />
        </div>
      </div>
    </form>
  );
}
