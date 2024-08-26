import React, { Fragment, useEffect, useState } from "react";
import { ArrowFileIcon, ImageIcon } from "@components/UI";
import {
  Input,
  InputContainer,
  CustomDatePicker,
  Card,
  FileInput,
} from "@components";
import { FormHeader } from "@components/Forms";
import { Button, UploaderInputs } from "@components/index";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// import { getProjectTitleApi } from "@services/apiProject";
import toast from "react-hot-toast";
import { Spin } from "antd";

const Title = () => {
  const { id: jobId } = useParams();
  const [defaultValues, setDefaultValues] = useState({});
  const { id: titleFormId, ...defaultValuesform } = defaultValues;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: titleFormId && isEditting ? defaultValuesform : {},
  });

  const onSubmit = async function (data) {
    const finalDataToUpload = {
      ...data,
      date: new Date(data.date.$d).toLocaleDateString(),
      primary_image: data.primary_image?.[0],
      secondary_image: data?.secondary_image?.[0],
    };
  };

  return (
    <>
      <FormHeader className="" btnText="View Page" pageTitle="Title" />

      <Card className="px-8 py-6  mb-4">
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
              text="Primary Image:"
              name="primary_image"
              register={register}
              id="primary_image"
              multiple={false}
              icon={ImageIcon}
            />
            <UploaderInputs
              wrapperClass="grow w-full"
              text="Secondary Logo:"
              name="secondary_image"
              id="secondary_image"
              register={register}
              multiple={false}
            />
          </div>
          <Button type="submit" variant="gradient" className="w-full mt-6">
            {isSubmitting ? <Spin /> : "Submit"}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Title;
