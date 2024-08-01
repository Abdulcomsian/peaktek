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
          name="company_representative"
          ref={inputRefs?.company_representative}
          value={values?.company_representative || ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.company_representative}
          touched={touched?.company_representative}
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
          name="company_signed_date"
          label="Date Signed"
          className="mb-4 md:mb-0"
          value={values?.company_signed_date || ""}
          onBlur={handleBlur}
          ref={inputRefs?.company_signed_date}
          onChange={(dateString) =>
            setFieldValue("company_signed_date", dateString)
          }
          error={errors?.company_signed_date}
          touched={touched?.company_signed_date}
        />
      </InputContainer>
    </div>
  );
};

export default SignatureForm;
