import React from "react";
import { InputContainer } from "@components";
import {
  CustomTimePicker,
  DateSelector,
  TextBox,
} from "@components/FormControls";

const AdjustorForm = ({
  className,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  setFieldValue,
  inputRefs,
  onchangePhoneNumber,
}) => {
  return (
    <div className={className}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Adjustor"
          placeholder="John Doe"
          type="text"
          name="name"
          className="md:mr-4 mb-4 md:mb-0"
          value={values?.name}
          ref={inputRefs?.name}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.name}
          touched={touched?.name}
        />
        <TextBox
          label="Phone:"
          placeholder="000-000-0000"
          type="tel"
          name="phone"
          className="md:mr-4 mb-4 md:mb-0"
          ref={inputRefs?.phone}
          value={values?.phone}
          onBlur={handleBlur}
          onChange={onchangePhoneNumber}
          error={errors?.phone}
          touched={touched?.phone}
        />
        <TextBox
          label="Adjustor Email:"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          className="md:mr-4 mb-4 md:mb-0"
          ref={inputRefs?.email}
          value={values?.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.email}
          touched={touched?.email}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <DateSelector
          label="Date sent"
          className="w-full lg:max-w-[18.5rem]"
          name="date"
          ref={inputRefs?.date}
          value={values?.date}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("date", dateString)}
          error={errors?.date}
          touched={touched?.date}
        />
      </InputContainer>
    </div>
  );
};

export default AdjustorForm;
