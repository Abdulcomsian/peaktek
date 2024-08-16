import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Input, InputContainer, CustomDatePicker } from "@components";
import { Button, UploaderInputs } from "@components/index";
import { Spin } from "antd";
import { formateErrorName, mapToArray } from "../../../utils/helper";
import { ImageIcon } from "@components/UI";
import { createTitle, getTitle } from "@services/apiDesignMeeting";
import { toast } from "react-hot-toast";
import { useAuth } from "@context/AuthContext";

export default function TitleForm() {
  const { id: jobId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const {logout} = useAuth()
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: async () => {
      const res = await getTitle(jobId);
      if (res.status >= 200 && res.status < 300 && Object.keys(res.data.data).length > 0) {
        setIsEditing(true)
        return res.data.data;
      }
      else return {}
    },
  });

  const onSubmit = async function (data) {
    console.log("daatata", data)
    
    const finalDataToUpload = {
      ...data,
      primary_image: data.primary_image instanceof FileList ? data.primary_image[0] : null,
      secondary_image: data.secondary_image instanceof FileList ? data.secondary_image[0] : null,
    };

    console.log(finalDataToUpload)

    try {
      const resp = await createTitle(finalDataToUpload, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        reset();
      }
      if(resp.status === 401){
        toast.error(resp.message)
        logout()
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-6" key="123">
      <InputContainer className="flex flex-col md:flex-row justify-between">
        <Input
          disabled={isLoading}
          label="First Name:"
          placeholder="John"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
          register={register}
          name="first_name"
          error={
            errors.first_name && formateErrorName(errors?.first_name?.message)
          }
        />
        <Input
          disabled={isLoading}
          label="Last Name:"
          placeholder="Doe"
          type="text"
          className="mb-4"
          applyMarginBottom={true}
          register={register}
          name="last_name"
          error={
            errors.last_name && formateErrorName(errors?.last_name?.message)
          }
        />
      </InputContainer>
      <Input
        disabled={isLoading}
        label="Company Name:"
        placeholder="eg.Microsoft"
        type="text"
        className="md:mr-4 mb-4"
        applyMarginBottom={true}
        register={register}
        name="company_name"
        error={
          errors.company_name && formateErrorName(errors?.company_name?.message)
        }
      />
      <Input
        disabled={isLoading}
        label="Address:"
        placeholder="350 5th Ave"
        type="text"
        className="md:mr-4 mb-4"
        applyMarginBottom={true}
        register={register}
        name="address"
        error={errors.address && formateErrorName(errors?.address?.message)}
      />
      <InputContainer className="flex flex-col lg:flex-row justify-between">
        <Input
          disabled={isLoading}
          label="City:"
          placeholder="New York"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
          register={register}
          name="city"
          error={errors.city && formateErrorName(errors?.city?.message)}
        />
        <Input
          disabled={isLoading}
          label="State/Province:"
          placeholder="NY"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
          register={register}
          name="state"
          error={errors.state && formateErrorName(errors?.state?.message)}
        />
        <Input
          disabled={isLoading}
          label="Zip Code/Postal Code:"
          placeholder="10118"
          type="number"
          className="mb-4"
          applyMarginBottom={true}
          register={register}
          name="zip"
          error={
            errors.postal_code && formateErrorName(errors?.postal_code?.message)
          }
        />
      </InputContainer>
      <Input
        disabled={isLoading}
        label="Report Type:"
        placeholder="Enter report type"
        type="text"
        className="mb-4"
        applyMarginBottom={true}
        register={register}
        name="report_type"
        error={
          errors.report_type && formateErrorName(errors?.report_type?.message)
        }
      />
      <CustomDatePicker
        label="Date:"
        className="mb-4"
        control={control}
        name="date"
        error={errors.date && formateErrorName(errors?.date?.message)}
      />
      <div className="flex flex-col md:flex-row gap-4 ">
        <UploaderInputs
          wrapperClass="grow w-full"
          text="Primary Image:"
          name="primary_image"
          register={register}
          id="primary_image"
          icon={<ImageIcon />}
          require={!isEditing}
          fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
          multiple={false}
          error={
            errors.primary_image &&
            formateErrorName(errors?.primary_image?.message)
          }
          defaultFiles={watch("primary_image")}
        />
        <UploaderInputs
          wrapperClass="grow w-full"
          text="Secondary Logo:"
          name="secondary_image"
          id="secondary_image"
          register={register}
          icon={<ImageIcon />}
          require={!isEditing}
          fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
          multiple={false}
          error={
            errors.secondary_image &&
            formateErrorName(errors?.secondary_image?.message)
          }
          defaultFiles={watch("secondary_image")}
        />
      </div>
      <Button type="submit" variant="gradient" className=" mt-6">
        {isLoading ? <Spin /> : "Submit"}
      </Button>
    </form>
  );
}
