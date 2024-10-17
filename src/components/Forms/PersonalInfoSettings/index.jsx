import { Input } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { handlePhoneChange } from "../../../utils/helper";
import { Button } from "@components/UI";

export default function PersonalInfoSettings() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();

  const onSubmit = function (data) {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[2fr_3fr] pb-6">
        <h2 className="font-semibold">Personal Information</h2>
        <div className="flex flex-col gap-4">
          <Input
            register={register}
            label="First Name"
            name="first_name"
            id="first_name"
            applyMarginBottom={true}
          />
          <Input
            register={register}
            label="Last Name"
            name="last_name"
            id="last_name"
            applyMarginBottom={true}
          />
          <Input
            register={register}
            label="Email"
            name="email"
            id="email"
            type="email"
            applyMarginBottom={true}
          />
          <Input
            register={register}
            label="Phone"
            name="phone"
            id="phone"
            applyMarginBottom={true}
            onChange={(e) => {
              const value = handlePhoneChange(e);
              setValue("phone", value);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-[2fr_3fr] pt-6">
        <h2 className="font-semibold">Job Information</h2>
        <div className="flex flex-col gap-4">
          <Input
            register={register}
            label="Job Title"
            name="job-title"
            id="job-title"
            applyMarginBottom={true}
          />
          <Input
            register={register}
            label="Market Segment (Territory)"
            name="market_segment"
            id="market_segment"
            applyMarginBottom={true}
          />
          <Button type="submit" variant="gradient" className="self-end">
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
