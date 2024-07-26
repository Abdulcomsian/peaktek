import { InputContainer } from "@components";
import {
  CustomTimePicker,
  DateSelector,
  TextBox,
} from "@components/FormControls";
import React, { Fragment } from "react";

const AdjustorForm = ({
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  setFieldValue,
}) => {
  return (
    <Fragment>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Name:"
          placeholder="John Doe"
          type="text"
          name="name"
          className="md:mr-4 mb-4 md:mb-0"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
        />
        <TextBox
          label="Phone:"
          placeholder="923081177825"
          type="number"
          name="phone"
          className="md:mr-4 mb-4 md:mb-0"
          value={values.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.phone}
          touched={touched.phone}
        />
        <TextBox
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          value={values.email}
          className="md:mr-4 mb-4 md:mb-0"
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />
        <CustomTimePicker
          label="Select a Time"
          className="mb-4 md:mb-0"
          value={values.time}
          name="time"
          onBlur={handleBlur}
          onChange={(timeString) => setFieldValue("time", timeString)}
          error={errors.time}
          touched={touched.time}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <DateSelector
          label="Select a Date"
          className=""
          name="date"
          value={values.date}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("date", dateString)}
          error={errors.date}
          touched={touched.date}
        />
      </InputContainer>
    </Fragment>
  );
};

export default AdjustorForm;
