import { CheckBox, Input } from "@components/FormControls";
import { Button, DropDown } from "@components/UI";
import { useForm } from "react-hook-form";
const marketOptions = [
  { label: "Nashville", value: "Nashville" },
  { label: "Chattanooga", value: "Chattanooga" },
];

export default function ReadyToClose() {
  const { control, register, handleSubmit, setValue } = useForm();
  const onSubmit = function (data) {
    console.log(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-white p-5 rounded-2xl">
        <CheckBox
          label="Final Verifications:"
          register={register}
          name="is_paid"
          id="is_paid"
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
              name="insurance_representative"
              id="insurance_representative"
              options={[]}
              placeholder="Select an option"
              rules={{ required: "This field is required" }} // Optional validation rules
            />
            <DropDown
              vertical={true}
              control={control}
              label="Sale Rep 2:"
              labelClass="font-medium text-sm"
              name="insurance_representative"
              id="insurance_representative"
              options={[]}
              placeholder="Select an option"
              rules={{ required: "This field is required" }} // Optional validation rules
            />
            <Input
              type="number"
              label="Commission Percentage:"
              register={register}
              name="commission_percentage_rep_1"
              id="commission_percentage_rep_1"
              min={0}
              max={100}
            />
            <Input
              type="number"
              min={0}
              max={100}
              label="Commission Percentage:"
              name="commission_percentage_rep_2"
              id="commission_percentage_rep_2"
              register={register}
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
              name="deal_value"
              id="deal_value"
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
              name="laber_costs"
              id="laber_costs"
              register={register}
            />
            <Input
              type="number"
              label="Costs of Goods:"
              name="cost_of_goods"
              id="cost_of_goods"
              register={register}
            />
          </div>
        </div>
        <Button variant="gradient" className="col-span-2 justify-self-end">
          Save
        </Button>
      </div>
    </form>
  );
}
