import {
  Ckeditor,
  CustomTimePicker,
  DateSelector,
  TextBox,
} from "@components/FormControls";
import { InputContainer } from "@components/index";
import React from "react";
import Button from "../ui/Button";

const ReadyToBuild = () => {
  return (
    <div>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Ready to Build
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <TextBox
            label="Recipient"
            placeholder="John Doe"
            // type="text"
            // name="name"
            className="md:mr-4 mb-4 md:mb-0"
            // value={values.name}
            // onBlur={handleBlur}
            // onChange={handleChange}
            // error={errors.name}
            // touched={touched.name}
          />
          <DateSelector
            label="Select a Date"
            className="md:mr-4 mb-4 md:mb-0"
            //   name="date"
            //   value={values.date}
            //   onBlur={handleBlur}
            //   onChange={(dateString) => setFieldValue("date", dateString)}
            //   error={errors.date}
            //   touched={touched.date}
          />
          <CustomTimePicker
            label="Select a Time"
            className="mb-4 md:mb-0"
            //   value={values.time}
            //   name="time"
            //   onBlur={handleBlur}
            //   onChange={(timeString) => setFieldValue("time", timeString)}
            //   error={errors.time}
            //   touched={touched.time}
          />
        </InputContainer>
        <Ckeditor className="mb-4" />
        <Button className="text-white btn-gradient px-4 py-1">Build SMS</Button>
      </div>
    </div>
  );
};

export default ReadyToBuild;
