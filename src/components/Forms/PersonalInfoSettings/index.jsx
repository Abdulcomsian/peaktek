import { Input } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { handlePhoneChange } from "../../../utils/helper";
import { Button, Loader } from "@components/UI";
import { useAuth } from "@context/AuthContext";
import { updatePersonalInformation } from "@services/apiSettings";

export default function PersonalInfoSettings() {
  const { user } = useAuth();
  console.log(user);
  const {
    id: userId,
    first_name,
    last_name,
    email,
    phone,
    job_title,
    market_segment,
  } = user;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: user
      ? {
          first_name,
          last_name,
          email,
          phone,
          job_title,
          market_segment,
        }
      : {},
  });

  const onSubmit = async function (data) {
    console.log(data);
    const resp = await updatePersonalInformation(data, userId);
    console.log("Update user resp", resp);
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
            disabled={true}
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
            name="job_title"
            id="job_title"
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
            {isSubmitting ? (
              <Loader width="24px" height="24px" color="#fff" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
