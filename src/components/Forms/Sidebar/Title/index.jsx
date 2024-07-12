import React, { Fragment, useState } from "react";
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
import { useParams } from "react-router-dom";
import { createProjectTitle } from "@services/apiProject";

const Title = () => {
  const { id: jobId } = useParams();
  const { register, handleSubmit, control } = useForm();

  const onSubmit = async function (data) {
    const finalDataToUpload = {
      ...data,
      date: new Date(data.date.$d).toLocaleDateString(),
    };

    const resp = await createProjectTitle(finalDataToUpload, jobId);
    console.log("Resp", resp);
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
            />
            <Input
              label="Last Name:"
              placeholder="Doe"
              type="text"
              className="mb-4"
              applyMarginBottom={true}
              register={register}
              name="lastName"
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
          />
          <Input
            label="Address:"
            placeholder="350 5th Ave"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
            register={register}
            name="address"
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
            />
            <Input
              label="State/Province:"
              placeholder="NY"
              type="text"
              className="md:mr-4 mb-4"
              applyMarginBottom={true}
              register={register}
              name="state"
            />
            <Input
              label="Zip Code/Postal Code:"
              placeholder="10118"
              type="number"
              className="mb-4"
              applyMarginBottom={true}
              register={register}
              name="postal_code"
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
          />
          <CustomDatePicker
            label="Date:"
            className="mb-4"
            control={control}
            name="date"
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
              register={register}
              name="secondary_image"
              id="secondary_image"
            />
          </div>
          <Button type="submit" variant="gradient" className="w-full mt-6">
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Title;
