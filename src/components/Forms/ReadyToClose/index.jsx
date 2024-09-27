import { CheckBox, Input } from "@components/FormControls";
import { Button, DropDown } from "@components/UI";
import ButtonSave from "@components/UI/ButtonSave";
import { getReadyToClose, updateReadyToClose } from "@services/apiReadyToClose";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";

const marketOptions = [
  { label: "Nashville", value: "Nashville" },
  { label: "Chattanooga", value: "Chattanooga" },
];

export default function ReadyToClose() {
  const { id: jobId } = useParams();
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    defaultValues: async () => {
      const resp = await getReadyToClose(jobId);
      console.log(resp.data.data);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data.data;
      } else return {};
    },
  });

  const isVarified = getValues()?.status === "1";
  const sales_rep1_commission_percentage =
    getValues()?.sales_rep1_commission_percentage;
  const sales_rep2_commission_percentage =
    getValues().sales_rep2_commission_percentage;

  const usersData = useSelector((state) => state?.users?.usersData);
  const userOptions = usersData.map((user) => ({
    value: `${user.id}`,
    label: user.name,
  }));

  useEffect(() => {
    const newValue = sales_rep1_commission_percentage?.replace("%", "");
    setValue("sales_rep1_commission_percentage", `${newValue}%`);
  }, [sales_rep1_commission_percentage]);

  const onSubmit = async function (data) {
    console.log(data);
    const resp = await updateReadyToClose(data, jobId);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
    }
    console.log(resp);
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

  if (isVarified)
    return (
      <p className="text-sm text-stone-500 text-center">
        ⛔️ This job is alreday closed
      </p>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-white p-5 rounded-2xl">
        <CheckBox
          label="Final Verifications:"
          register={register}
          name="status"
          id="status"
          wrapperClassName="col-span-2"
        />
        <div className="col-span-full  bg-stone-200 p-4 rounded-2xl mb-4">
          <h2 className=" text-stone-500 font-semibold uppercase mb-2">
            Sales representatives:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-white p-4 rounded-2xl">
            <DropDown
              vertical={true}
              control={control}
              label="Sale Rep 1:"
              labelClass="font-medium text-sm"
              name="sales_rep1"
              id="sales_rep1"
              options={userOptions}
              placeholder="Select an option"
              rules={{ required: "This field is required" }} // Optional validation rules
            />
            <DropDown
              vertical={true}
              control={control}
              label="Sale Rep 2:"
              labelClass="font-medium text-sm"
              name="sales_rep2"
              id="sales_rep2"
              options={userOptions}
              placeholder="Select an option"
              rules={{ required: "This field is required" }} // Optional validation rules
            />
            <Input
              label="Commission Percentage:"
              register={register}
              name="sales_rep1_commission_percentage"
              id="sales_rep1_commission_percentage"
              min={0}
              max={100}
              onChange={(e) => {
                const value = e.target.value;
                const newValue = value?.replaceAll("%", "");
                setValue("sales_rep1_commission_percentage", `${newValue}%`);
              }}
              validate={(value) => {
                const isValidWithPercent = /^(100|[1-9]?[0-9])%?$/.test(value);

                if (!isValidWithPercent) {
                  return "Please enter a valid number between 0 and 100.";
                }

                if (value.endsWith("%")) {
                  const numberValue = parseInt(value.slice(0, -1), 10); // Extract the numeric part
                  if (numberValue > 100) {
                    return "Number should be less than or equal to 100.";
                  }
                }
              }}
              error={errors?.sales_rep1_commission_percentage?.message}
            />
            <Input
              min={0}
              max={100}
              label="Commission Percentage:"
              name="sales_rep2_commission_percentage"
              id="sales_rep2_commission_percentage"
              register={register}
              onChange={(e) => {
                const value = e.target.value;
                const newValue = value?.replaceAll("%", "");
                setValue("sales_rep2_commission_percentage", `${newValue}%`);
              }}
              validate={(value) => {
                // Check if the value is a valid number or empty
                const isValidWithPercent = /^(100|[1-9]?[0-9])%?$/.test(value);

                if (!isValidWithPercent) {
                  return "Please enter a valid number between 0 and 100.";
                }

                // If it ends with '%', check the numeric part
                if (value.endsWith("%")) {
                  const numberValue = parseInt(value.slice(0, -1), 10); // Extract the numeric part
                  if (numberValue > 100) {
                    return "Number should be less than or equal to 100.";
                  }
                }
              }}
              error={errors?.sales_rep2_commission_percentage?.message}
            />
          </div>
        </div>
        <div className="col-span-full bg-stone-200 rounded-2xl p-4">
          <h2 className="col-span-full text-stone-500 font-semibold uppercase mb-2">
            financial summary:
          </h2>
          <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-white rounded-2xl p-4">
            <Input
              type="number"
              label="Deal value:"
              name="deal_value"
              id="deal_value"
              register={register}
            />
            <DropDown
              vertical={true}
              control={control}
              label="Market:"
              labelClass="font-medium text-sm"
              name="market"
              id="market"
              options={marketOptions}
              placeholder="Select an option"
              rules={{ required: "This field is required" }} // Optional validation rules
            />
            <Input
              type="number"
              label="Material Costs:"
              name="material_costs"
              id="material_costs"
              register={register}
            />
            <Input
              type="number"
              label="Square Count:"
              name="square_count"
              id="square_count"
              register={register}
            />
            <Input
              type="number"
              label="Labour Costs:"
              name="labor_costs"
              id="labor_costs"
              register={register}
            />
            <Input
              type="number"
              label="Costs of Goods:"
              name="costs_of_goods"
              id="costs_of_goods"
              register={register}
            />
          </div>
        </div>
        <ButtonSave
          isLoading={isSubmitting}
          className="col-span-2 justify-self-end"
        />
      </div>
    </form>
  );
}
