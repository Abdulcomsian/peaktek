import React from "react";
import { InputContainer } from "@components";
import { TextBox } from "@components/FormControls";

const CustomerInformation = ({
  customer,
  className,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  inputRefs,
  readOnlyFields = [],
}) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Name:"
          placeholder="John Doe"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="name"
          id="name"
          value={customer?.name || ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.name}
          touched={touched?.name}
          readOnly={readOnlyFields.includes("name")}
        />
        <TextBox
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          name="email"
          value={customer?.email || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.email}
          touched={touched?.email}
        />
        <TextBox
          label="Phone:"
          placeholder="923081177825"
          type="number"
          className="mb-4 md:mb-0"
          name="phone"
          value={customer?.phone || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.phone}
          touched={touched?.phone}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Street:"
          placeholder="west Bridge"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="street"
          ref={inputRefs?.street}
          value={values?.street || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.street}
          touched={touched?.street}
        />
        <TextBox
          label="City:"
          placeholder="New York"
          type="text"
          className="md:mr-4 md:max-w-xs mb-4 md:mb-0"
          name="city"
          ref={inputRefs?.city}
          value={values?.city || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.city}
          touched={touched?.city}
        />
        <TextBox
          label="State:"
          placeholder="NY"
          type="text"
          className="md:mr-4 md:max-w-40 mb-4 md:mb-0"
          name="state"
          ref={inputRefs?.state}
          value={values?.state || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.state}
          touched={touched?.state}
        />
        <TextBox
          label="Zip:"
          placeholder="45678"
          type="number"
          className="md:max-w-40 mb-4 md:mb-0"
          name="zip_code"
          ref={inputRefs?.zip_code}
          value={values?.zip_code || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.zip_code}
          touched={touched?.zip_code}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Insurance:"
          placeholder="eg. Health Insurance"
          type="text"
          className="md:mr-4 mb-4 md:mb-0"
          name="insurance"
          ref={inputRefs?.insurance}
          value={values?.insurance || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.insurance}
          touched={touched?.insurance}
        />
        <TextBox
          label="Claim Number:"
          placeholder="23232323"
          type="number"
          className="md:mr-4 mb-4 md:mb-0"
          name="claim_number"
          ref={inputRefs?.claim_number}
          value={values?.claim_number || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.claim_number}
          touched={touched?.claim_number}
        />
        <TextBox
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          className="mb-4 md:mb-0"
          name="policy_number"
          ref={inputRefs?.policy_number}
          value={values?.policy_number || ""} // Default to empty string if undefined
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.policy_number}
          touched={touched?.policy_number}
        />
      </InputContainer>
    </div>
  );
};

export default CustomerInformation;
