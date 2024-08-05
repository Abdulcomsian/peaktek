import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Input, InputContainer, CustomDatePicker } from "@components";
import { Button, UploaderInputs } from "@components/index";
import { Spin } from "antd";
import { createProjectTitle, getProjectTitleApi } from "@services/apiProject";
import { formateErrorName } from "../../../utils/helper";
import { ImageIcon } from "@components/UI";

export default function TitleForm() {
  const { id: jobId } = useParams();
  const [defaultValues, setDefaultValues] = useState({});
  const { id: titleFormId, ...defaultValuesform } = defaultValues;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: titleFormId && isEditting ? defaultValuesform : {},
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getProjectTitle() {
        try {
          // setIsLoading(true);
          const resp = await getProjectTitleApi(jobId);
          console.log("RESPPP", resp);
          if (resp.status === 200 && Object.keys(resp.data).length > 0) {
            setDefaultValues(resp.data);
            setIsEditting(true);
          }
          if (resp.status === 422) {
            toast.error(resp.message);
            navigate("/dashboard");
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (jobId) getProjectTitle();
    },
    [jobId]
  );

  const onSubmit = async function (data) {
    const finalDataToUpload = {
      ...data,
      date: new Date(data.date.$d).toLocaleDateString(),
      primary_image: data.primary_image?.[0],
      secondary_image: data?.secondary_image?.[0],
    };

    console.log(finalDataToUpload);
    createProjectTitle(finalDataToUpload, jobId);
    // const resp = await createProjectTitle(finalDataToUpload, jobId);
    // console.log("Resp", resp);
    // if (resp.status >= 200 && resp.status < 300) {
    //   toast.success(resp.message);
    //   reset();
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-6" key="123">
        <InputContainer className="flex flex-col md:flex-row justify-between">
          <Input
            label="First Name:"
            placeholder="John"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
            register={register}
            name="first_name"
            defaultValue={defaultValues?.firstName || ""}
            error={
              errors.first_name && formateErrorName(errors?.first_name?.message)
            }
          />
          <Input
            label="Last Name:"
            placeholder="Doe"
            type="text"
            className="mb-4"
            applyMarginBottom={true}
            register={register}
            name="last_name"
            defaultValue={defaultValues?.lastName || ""}
            error={
              errors.last_name && formateErrorName(errors?.last_name?.message)
            }
          />
        </InputContainer>
        <Input
          label="Company Name:"
          placeholder="eg.Microsoft"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
          register={register}
          name="company_name"
          defaultValue={defaultValues?.company_name || ""}
          error={
            errors.company_name &&
            formateErrorName(errors?.company_name?.message)
          }
        />
        <Input
          label="Address:"
          placeholder="350 5th Ave"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
          register={register}
          name="address"
          defaultValue={defaultValues?.address || ""}
          error={errors.address && formateErrorName(errors?.address?.message)}
        />
        <InputContainer className="flex flex-col lg:flex-row justify-between">
          <Input
            label="City:"
            placeholder="New York"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
            register={register}
            name="city"
            defaultValue={defaultValues?.city || ""}
            error={errors.city && formateErrorName(errors?.city?.message)}
          />
          <Input
            label="State/Province:"
            placeholder="NY"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
            register={register}
            name="state"
            defaultValue={defaultValues?.state || ""}
            error={errors.state && formateErrorName(errors?.state?.message)}
          />
          <Input
            label="Zip Code/Postal Code:"
            placeholder="10118"
            type="number"
            className="mb-4"
            applyMarginBottom={true}
            register={register}
            name="postal_code"
            defaultValue={defaultValues?.postal_code || ""}
            error={
              errors.postal_code &&
              formateErrorName(errors?.postal_code?.message)
            }
          />
        </InputContainer>
        <Input
          label="Report Type:"
          placeholder="Enter report type"
          type="text"
          className="mb-4"
          applyMarginBottom={true}
          register={register}
          name="report_type"
          defaultValue={defaultValues?.report_type || ""}
          error={
            errors.report_type && formateErrorName(errors?.report_type?.message)
          }
        />
        <CustomDatePicker
          label="Date:"
          className="mb-4"
          control={control}
          name="date"
          defaultValue={defaultValues?.date || ""}
          error={errors.date && formateErrorName(errors?.date?.message)}
        />
        <div className="flex flex-col md:flex-row items-center gap-4 ">
          <UploaderInputs
            wrapperClass="grow w-full"
            title="Primary Image:"
            name="primary_image"
            register={register}
            id="primary_image"
            icon={<ImageIcon />}
            require={false}
          />
          <UploaderInputs
            wrapperClass="grow w-full"
            title="Secondary Logo:"
            name="secondary_image"
            id="secondary_image"
            register={register}
            icon={<ImageIcon />}
            require={false}
          />
        </div>
        <Button type="submit" variant="gradient" className="w-full mt-6">
          {isLoading ? <Spin /> : "Submit"}
        </Button>
      </form>
    </>
  );
}
