import { CheckBox, Input, TextareaInput } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { UploaderInputs } from "@components/index";
import { Ckeditor } from "@components/FormControls";
import { Button, ImageIcon, Loader, RenameFileUI } from "@components/UI";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";

export default function COCInsuranceForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataChange = (dataToMap, id) => {
    // Update the receivedData based on the id
    setReceivedData((prevData) => {
      const newData = [...prevData];
      newData[id] = dataToMap;
      return newData;
    });
  };

  const onSubmit = function (data) {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 rounded-3xl px-4 py-5">
        <CheckBox
          label="Email sent"
          id="status"
          name="status"
          register={register}
          wrapperClassName="flex items-center justify-end gap-2 col-span-2"
        />
        <Input
          id="sent_to"
          name="sent_to"
          register={register}
          label="Sent to:"
          type="email"
          placeholder="insurance@email.com"
          applyMarginBottom={true}
        />
        <Input
          id="claim_number"
          name="claim_number"
          register={register}
          label="Subject"
          placeholder="Claim # number"
          applyMarginBottom={true}
        />
        <CkeditorControlled
          control={control}
          name="email_body"
          className="col-span-2"
        />
        <div className="col-span-1 md:col-span-2">
          <UploaderInputs
            name="attachments"
            id="attachment"
            register={register}
            icon={<ImageIcon />}
            require={false}
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
          />
          {/* {row?.attachment && (
              <RenameFileUI
                files={row.attachment}
                apiUpdateFileEndPoint="/api/change/project-design-inspection/file-name"
                apiDeleteFileEndpoint="/api/delete/project-design-inspection/media"
              />
            )} */}
        </div>
      </div>
      <Button type="submit" variant="gradient">
        Send
      </Button>
    </form>
  );
}
