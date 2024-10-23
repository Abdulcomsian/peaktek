import { CheckBox, Input, TextareaInput } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { UploaderInputs } from "@components/index";
import { Button, ImageIcon, RenameFileUI } from "@components/UI";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { creatCOCInsuranceEmail, getCoc } from "@services/apiCOC";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "@components/UI";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const getCOCInsuraceEmail = async (jobId) => {
  const resp = await getCoc(jobId);
  if (resp.status >= 200 && resp.status < 300) {
    return resp.data;
  }
  console.log("COC insurance email", resp);
};

export default function COCInsuranceForm() {
  const [isLoading, setIsLoading] = useState();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: () => getCOCInsuraceEmail(jobId) });
  const { id: jobId } = useParams();
  const COCId = watch("id");

  const handleDataChange = (dataToMap, id) => {
    // Update the receivedData based on the id
    setReceivedData((prevData) => {
      const newData = [...prevData];
      newData[id] = dataToMap;
      return newData;
    });
  };

  const onSubmit = async function (data) {
    const {
      subject,
      email_body,
      send_to,
      status,
      attachments,
      coc_insurance_email_sent,
    } = data;
    // console.log("INSURANCE EMAIL DATA", coc_insurance_email_sent);
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("email_body", email_body);
    formData.append("send_to", send_to);
    formData.append(
      "coc_insurance_email_sent",
      coc_insurance_email_sent ? "1" : "0"
    );

    if (attachments.length > 0) {
      for (let x = 0; x < attachments.length; x++) {
        formData.append("attachments[]", attachments[x]);
      }
    }

    // To view the contents of FormData, you can iterate over it
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    try {
      const resp = await creatCOCInsuranceEmail(formData, COCId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.message);
      }
      if (resp.status === 422) {
        toast.error("COC not Found");
      }
      if (resp.status === 500) {
        toast.error("Something went wrong.");
      }
      console.log(resp);
    } finally {
    }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 rounded-3xl px-4 py-5">
        <CheckBox
          label="Email sent"
          id="coc_insurance_email_sent"
          name="coc_insurance_email_sent"
          register={register}
          wrapperClassName="flex items-center justify-end gap-2 col-span-2"
        />
        <Input
          id="send_to"
          name="send_to"
          register={register}
          label="Send to:"
          type="email"
          placeholder="insurance@email.com"
          applyMarginBottom={true}
        />
        <Input
          id="subject"
          name="subject"
          register={register}
          label="Subject"
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
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <Loader width={"28px"} height={"28px"} color="#fff" />
          </div>
        ) : (
          "Send"
        )}
      </Button>
    </form>
  );
}
