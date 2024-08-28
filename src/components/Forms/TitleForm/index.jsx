import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Input, InputContainer, CustomDatePicker } from "@components";
import { Button, UploaderInputs } from "@components/index";
import { formateErrorName } from "../../../utils/helper";
import { ImageIcon, RenameFileUI } from "@components/UI";
import { createTitle, getTitle } from "@services/apiDesignMeeting";
import { toast } from "react-hot-toast";
import { useAuth } from "@context/AuthContext";
import { Loader } from "@components/UI";

export default function TitleForm() {
  const { id: jobId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Manage loading state
  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      try {
        const res = await getTitle(jobId);
        if (
          res.status >= 200 &&
          res.status < 300 &&
          Object.keys(res.data.data).length > 0
        ) {
          setIsEditing(true);
          return res.data.data;
        } else {
          return {}; // Return empty object if no data
        }
      } catch (error) {
        console.error(error);
        return {}; // Return empty object on error
      } finally {
        setIsLoading(false); // Set loading to false after data fetch
      }
    },
  });

  const defaultPrimaryImage = watch("primary_images");
  const defaultSecondaryImage = watch("secondary_images");

  const onSubmit = async function (data) {
    const finalDataToUpload = {
      ...data,
      primary_image:
        data.primary_image instanceof FileList ? data.primary_image[0] : null,
      secondary_image:
        data.secondary_image instanceof FileList
          ? data.secondary_image[0]
          : null,
    };

    try {
      const resp = await createTitle(finalDataToUpload, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        reset();
      }
      if (resp.status === 401) {
        toast.error(resp.message);
        logout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader width={"24px"} height={"24px"} color="#000" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-6" key="123">
      <InputContainer className="flex flex-col md:flex-row justify-between">
        <Input
          disabled={isLoading || isSubmitting}
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
          disabled={isLoading || isSubmitting}
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
        disabled={isLoading || isSubmitting}
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
        disabled={isLoading || isSubmitting}
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
          disabled={isLoading || isSubmitting}
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
          disabled={isLoading || isSubmitting}
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
          disabled={isLoading || isSubmitting}
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
        disabled={isLoading || isSubmitting}
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
        <div className="grow">
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
          {defaultPrimaryImage && (
            <RenameFileUI
              files={defaultPrimaryImage}
              apiDeleteFileEndpoint="/api/delete/project-design-title/media"
              apiUpdateFileEndPoint="/api/change/project-design-title/file-name"
            />
          )}
        </div>
        <div className="grow">
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
          {defaultSecondaryImage && (
            <RenameFileUI
              files={defaultSecondaryImage}
              apiDeleteFileEndpoint="/api/delete/project-design-title/media"
              apiUpdateFileEndPoint="/api/change/project-design-title/file-name"
            />
          )}
        </div>
      </div>
      <Button type="submit" variant="gradient" className=" mt-6">
        {isSubmitting ? (
          <Loader width={"24px"} height={"24px"} color="#fff" />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
