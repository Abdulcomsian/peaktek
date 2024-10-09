import { CheckBox, Input } from "@components/FormControls";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import SimpleFileUploader from "@components/FormControls/SimpleFileUploader";
import { Button, ImageIcon, Loader } from "@components/UI";
import { UploaderInputs } from "@components/index";
import { createMaterialOrderConfirmationEmail } from "@services/apiMaterialOrder";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function MoInformationEmail() {
  const { id: jobId } = useParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm();

  const onSubmit = async function (data) {
    const { email_body, send_to, status, subject, attachments } = data;

    const formData = new FormData();
    formData.append("send_to", send_to);
    formData.append("subject", subject);
    formData.append("email_body", email_body);
    formData.append("status", status);

    if (attachments.length > 0) {
      for (let x = 0; x < attachments.length; x++) {
        formData.append("attachments[]", attachments[x]);
      }
    }

    console.log(Object.fromEntries(formData));
    const resp = await createMaterialOrderConfirmationEmail(formData, jobId);
    if (resp.status >= 200 && resp.status < 300) {
      console.log(resp);
    }
    if (resp.status === 422) {
      toast.error("Material Order should be created first.");
    }
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
        <Input
          label="Subject:"
          placeholder="Subject"
          className="md:mr-4 mb-4"
          name="subject"
          id="subject"
          register={register}
          control={control}
        />
        <CkeditorControlled
          label="Email body:"
          control={control}
          name="email_body"
          id="email_body"
          className="mb-4"
        />
        <SimpleFileUploader
          register={register}
          name="attachments"
          id="attachments"
          icon={<ImageIcon />}
          multiple={true}
          fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="gradient"
          className="mt-4"
        >
          {isSubmitting ? (
            <Loader width={"24px"} height={"24px"} color="#fff" />
          ) : (
            "Send"
          )}
        </Button>
      </div>
    </form>
  );
}
