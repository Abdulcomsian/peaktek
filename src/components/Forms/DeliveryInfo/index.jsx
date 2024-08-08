import React from "react";
import { InputContainer } from "@components";
import { DateSelector, TextBox } from "@components/FormControls";

const DeliveryInformation = ({
  className,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  inputRefs,
  setFieldValue,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <DateSelector
          label="Select a Date:"
          className="md:mr-4  mb-4 md:mb-0"
          name="date_needed"
          value={values?.date_needed}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("date_needed", dateString)}
          error={errors?.date_needed}
          touched={touched?.date_needed}
        />
        <TextBox
          label="Square Count:"
          placeholder="24"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          name="square_count"
          ref={inputRefs?.square_count}
          value={values?.square_count || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.square_count}
          touched={touched?.square_count}
        />
        <TextBox
          label="Total Perimeter LF:"
          placeholder="245"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          name="total_perimeter"
          ref={inputRefs?.total_perimeter}
          value={values?.total_perimeter || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.total_perimeter}
          touched={touched?.total_perimeter}
        />
        <TextBox
          label="Ridge LF:"
          placeholder="245"
          type="number"
          className="mb-4 md:mb-0"
          name="ridge_lf"
          ref={inputRefs?.ridge_lf}
          value={values?.ridge_lf || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.ridge_lf}
          touched={touched?.ridge_lf}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <DateSelector
          label="Build Date:"
          name="build_date"
          className="md:mr-4  mb-4 md:mb-0"
          value={values?.build_date}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("build_date", dateString)}
          error={errors?.build_date}
          touched={touched?.build_date}
        />
        <TextBox
          label="Valley SF:"
          placeholder="245"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          name="valley_sf"
          ref={inputRefs?.valley_sf}
          value={values?.valley_sf || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.valley_sf}
          touched={touched?.valley_sf}
        />
        <TextBox
          label="Hip and Ridge LF:"
          placeholder="235"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          name="hip_and_ridge_lf"
          ref={inputRefs?.hip_and_ridge_lf}
          value={values?.hip_and_ridge_lf || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.hip_and_ridge_lf}
          touched={touched?.hip_and_ridge_lf}
        />
        <TextBox
          label="Drip Edge LF:"
          placeholder="245"
          type="number"
          className="mb-4 md:mb-0"
          name="drip_edge_lf"
          ref={inputRefs?.drip_edge_lf}
          value={values?.drip_edge_lf || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.drip_edge_lf}
          touched={touched?.drip_edge_lf}
        />
      </InputContainer>
    </div>
  );
};

export default DeliveryInformation;
