import { Input } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { handlePhoneChange } from "../../../utils/helper";
import { Button } from "@components/UI";

export default function JobInformation() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();
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
      <form className="flex flex-col gap-4">
        <p className="font-semibold">Change Password</p>
        <Input
          register={register}
          label="Current Password"
          name="current_password"
          id="current_password"
          applyMarginBottom={true}
        />
        <Input
          register={register}
          label="New Password"
          name="new_password"
          id="new_password"
          applyMarginBottom={true}
        />
        <Input
          register={register}
          label="Confirm New Password"
          name="new_password"
          id="new_password"
        />
        <Button variant="gradient" className="self-end">
          Change Password
        </Button>
      </form>
    </div>
  );
}
