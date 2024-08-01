import React from "react";
import { InputContainer } from "@components";
import { DateSelector, TextBox } from "@components/FormControls";

const SignatureForm = ({
  className,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  setFieldValue,
  inputRefs,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Company Representative:"
          placeholder="john Snow"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="company_signature"
          ref={inputRefs?.company_signature}
          value={values?.company_signature || ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.company_signature}
          touched={touched?.company_signature}
        />
        <TextBox
          label="Printed Name:"
          placeholder="john Doe"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="company_printed_name"
          ref={inputRefs?.company_printed_name}
          value={values?.company_printed_name || ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.company_printed_name}
          touched={touched?.company_printed_name}
        />
        <DateSelector
          name="company_date"
          label="Select a Date"
          className="mb-4 md:mb-0"
          value={values?.company_date || ""}
          onBlur={handleBlur}
          ref={inputRefs?.company_date}
          onChange={(dateString) => setFieldValue("company_date", dateString)}
          error={errors?.company_date}
          touched={touched?.company_date}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Customer Signature:"
          placeholder="john Snow"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="customer_signature"
          ref={inputRefs?.customer_signature}
          value={values?.customer_signature || ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.customer_signature}
          touched={touched?.customer_signature}
        />
        <TextBox
          label="Printed Name:"
          placeholder="john Snow"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="customer_printed_name"
          ref={inputRefs?.customer_printed_name}
          value={values?.customer_printed_name || ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.customer_printed_name}
          touched={touched?.customer_printed_name}
        />
        <DateSelector
          name="customer_date"
          label="Select a Date"
          className="mb-4 md:mb-0"
          value={values?.customer_date || ""}
          ref={inputRefs?.customer_date}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("customer_date", dateString)}
          error={errors?.customer_date}
          touched={touched?.customer_date}
        />
      </InputContainer>
    </div>
  );
};

export default SignatureForm;
