import React, { Fragment } from "react";
import {
  Input,
  InputContainer,
  CustomDatePicker,
  Card,
  FileInput,
} from "@components";
import { FormHeader } from "@components/Forms";
const Title = () => {
  return (
    <Fragment>
      <FormHeader className="" btnText="View Page" pageTitle="Title" />

      <Card className="px-8 py-6  mb-4">
        <Input
          label="Report Type:"
          placeholder="Enter report type"
          type="text"
          className="mb-4"
          applyMarginBottom={true}
        />
        <CustomDatePicker label="Date:" className="mb-4" />
        <FileInput label="Primary Image:" type="file" className="mb-6" />
        <FileInput
          label="Certification/Secondary Logo:"
          type="file"
          className="mb-6"
        />
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <Input
            label="First Name:"
            placeholder="John"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
          />
          <Input
            label="Last Name:"
            placeholder="Doe"
            type="text"
            className="mb-4"
            applyMarginBottom={true}
          />
        </InputContainer>
        <Input
          label="Company Name:"
          placeholder="eg.Microsoft"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
        />
        <Input
          label="Address:"
          placeholder="350 5th Ave"
          type="text"
          className="md:mr-4 mb-4"
          applyMarginBottom={true}
        />
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <Input
            label="City:"
            placeholder="New York"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
          />
          <Input
            label="State/Province:"
            placeholder="NY"
            type="text"
            className="md:mr-4 mb-4"
            applyMarginBottom={true}
          />
          <Input
            label="Zip Code/Postal Code:"
            placeholder="10118"
            type="number"
            className="mb-4"
            applyMarginBottom={true}
          />
        </InputContainer>
      </Card>
    </Fragment>
  );
};

export default Title;
