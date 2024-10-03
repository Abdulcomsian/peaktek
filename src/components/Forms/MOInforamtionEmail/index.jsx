import { CheckBox, Input } from "@components/FormControls";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { Button, ImageIcon } from "@components/UI";
import { UploaderInputs } from "@components/index";
import { useForm } from "react-hook-form";

export default function MoInformationEmail() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm();

  const onSubmit = function (data) {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <Input
            label="Send To:"
            type="email"
            placeholder="test@test.com"
            className="md:mr-4 mb-4 md:mb-0 max-w-[50%]"
            name="send_to[]"
            id="send_to"
            register={register}
          />
          <CheckBox
            register={register}
            name="status"
            id="status"
            label="Email sent:"
          />
        </div>
        {/* <Input
          label="Subject:"
          placeholder="Subject"
          className="md:mr-4 mb-4"
          name="subject"
          id="subject"
          register={register}
          control={control}
        /> */}
        {/* <CkeditorControlled
          label="Email body:"
          control={control}
          name="email_body"
          id="email_body"
        /> */}
        <UploaderInputs
          register={register}
          name="attachments"
          id="attachments"
          icon={<ImageIcon />}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="gradient"
          className="mt-4"
        >
          Send
        </Button>
      </div>
    </form>
  );
}
