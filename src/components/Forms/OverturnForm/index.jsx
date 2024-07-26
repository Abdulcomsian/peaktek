import { InputContainer } from "@components";
import {
  CustomTimePicker,
  DateSelector,
  TextBox,
} from "@components/FormControls";
import React, { Fragment } from "react";

const OverturnForm = ({
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
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          className="md:mr-4  mb-4 md:mb-0"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />
        <CustomTimePicker
          label="Select a Time"
          value={values.time}
          name="time"
          onBlur={handleBlur}
          onChange={(timeString) => setFieldValue("time", timeString)}
          error={errors.time}
          touched={touched.time}
          className="mb-4 md:mb-0 md:mr-4"
        />
        <DateSelector
          label="Select Date"
          className="mb-4 md:mb-0 "
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

export default OverturnForm;
