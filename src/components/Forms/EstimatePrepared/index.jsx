import React from "react";
import { InputContainer } from "@components";
import { DateSelector, FileUploader, TextBox } from "@components/FormControls";
import { ImageIcon } from "@components/UI";

const EstimatePreparedForm = ({
  className,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  setFieldValue,
}) => {
  return (
    <div className={className}>
      <InputContainer className="flex flex-col md:flex-row justify-between items md:mb-4">
        <TextBox
          label="Prepared By"
          placeholder="Enter Sales rep name"
          type="text"
          name="prepared_by"
          className="md:mr-4 mb-4 md:mb-0"
          value={values.prepared_by}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.prepared_by}
          touched={touched.prepared_by}
        />
        <div className="w-full flex flex-col items-center justify-center">
          <label
            htmlFor="complete_box"
            className="w-full flex justify-center text-sm font-medium text-gray-900 mb-2"
          >
            Completed
          </label>
          <input
            type="checkbox"
            className="h-10 w-10"
            id="complete_box"
            name="complete_box"
            checked={values.complete_box}
            onChange={handleChange}
          />
        </div>
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

      <FileUploader
        icon={<ImageIcon />}
        fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
        text="Drop your image here, or"
      />
    </div>
  );
};

export default EstimatePreparedForm;
