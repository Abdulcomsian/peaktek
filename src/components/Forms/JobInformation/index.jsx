import { Input } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { handlePhoneChange } from "../../../utils/helper";
import { Button } from "@components/UI";
import { updatePassword } from "@services/apiSettings";

export default function JobInformation() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();

  const onSubmit = async function (data) {
    const resp = await updatePassword(data);
  };

  return (
    <div className="grid grid-cols-[2fr_3fr] pb-4">
      <div>
        <h2 className="font-semibold">Password</h2>
        <p>
          After a successful password update,
          <br /> you will be redirected to the login <br /> page to log in with
          your new password.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <p className="font-semibold">Change Password</p>
        <Input
          register={register}
          type="password"
          label="Current Password"
          name="current_password"
          id="current_password"
          applyMarginBottom={true}
          required={true}
        />
        <Input
          register={register}
          type="password"
          label="New Password"
          name="new_password"
          id="new_password"
          applyMarginBottom={true}
          required={true}
        />
        <Input
          type="password"
          register={register}
          label="Confirm New Password"
          name="new_password_confirmation"
          id="new_password_confirmation"
          required={true}
          validate={(value) =>
            getValues().new_password === value || "Password need to match"
          }
          error={errors?.new_password_confirmation?.message}
        />
        <Button variant="gradient" type="submit" className="self-end">
          Change Password
        </Button>
      </form>
    </div>
  );
}
