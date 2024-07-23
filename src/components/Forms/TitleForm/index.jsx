import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Input, InputContainer, CustomDatePicker } from "@components";
import { Button, UploaderInputs } from "@components/index";

export default function TitleForm() {
  const { id: jobId } = useParams();
  const [defaultValues, setDefaultValues] = useState({});
  const { id: titleFormId, ...defaultValuesform } = defaultValues;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: titleFormId && isEditting ? defaultValuesform : {},
  });

  useEffect(
    function () {
      async function getProjectTitle() {
        try {
          setIsLoading(true);
          const resp = await getProjectTitleApi(jobId);
          console.log(resp);
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

    const resp = await createProjectTitle(finalDataToUpload, jobId);
    console.log("Resp", resp);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.message);
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer className="flex flex-col md:flex-row justify-between">
          <Input
            label="First Name:"
            placeholder="John"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
            register={register}
            name="firstName"
            defaultValue={defaultValues?.firstName || ""}
          />
          <Input
            label="Last Name:"
            placeholder="Doe"
            type="text"
            className="mb-4"
            applyMarginBottom={true}
            register={register}
            name="lastName"
            defaultValue={defaultValues?.lastName || ""}
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
        />
        <CustomDatePicker
          label="Date:"
          className="mb-4"
          control={control}
          name="date"
          defaultValue={defaultValues?.date || ""}
        />
        <div className="flex flex-col md:flex-row items-center gap-4 ">
          <UploaderInputs
            wrapperClass="grow w-full"
            title="Primary Image:"
            name="primary_image"
            register={register}
            id="primary_image"
          />
          <UploaderInputs
            wrapperClass="grow w-full"
            title="Secondary Logo:"
            name="secondary_image"
            id="secondary_image"
            register={register}
          />
        </div>
        <Button type="submit" variant="gradient" className="w-full mt-6">
          {isSubmitting ? <Spin /> : "Submit"}
        </Button>
      </form>
    </>
  );
}
