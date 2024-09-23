import React, { useEffect } from "react";
import { InputContainer } from "@components";
import { Input, TextBox } from "@components/FormControls";
import { useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../utils/helper";

const CustomerInformation = ({
  register,
  className,
  control,
  setValue,
  watch,
}) => {
  const { name, email, phone } = useSelector(
    (state) => state?.jobs?.singleJobData
  );
  console.log(
    "CUSTOMER JOB DETAIL",
    { name, email, phone },
    formatPhoneNumber(phone)
  );

  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Supplier:"
          placeholder="John Doe"
          className="md:mr-4 mb-4 md:mb-0"
          name="supplier"
          register={register}
          control={control}
        />
        <Input
          label="Homeowner Name:"
          placeholder="John Doe"
          className="md:mr-4 mb-4 md:mb-0"
          disabled={true}
          defaultValue={name || ""}
          name="name"
          id="name"
          control={control}
        />
        <Input
          label="Homeowner Email:"
          placeholder="john@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          disabled={true}
          defaultValue={email || ""}
          name="email"
          id="email"
        />
        <Input
          label="Phone:"
          placeholder="923081177825"
          type="text"
          className="mb-4 md:mb-0"
          disabled={true}
          defaultValue={formatPhoneNumber(phone) || ""}
          name="phone"
          id="phone"
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Street:"
          placeholder="west Bridge"
          className="md:mr-4 mb-4 md:mb-0"
          name="street"
          id="street"
          register={register}
        />
        <Input
          label="City:"
          placeholder="New York"
          className="md:mr-4 md:max-w-xs mb-4 md:mb-0"
          name="city"
          id="city"
          register={register}
        />
        <Input
          label="State:"
          placeholder="NY"
          className="md:mr-4 md:max-w-40 mb-4 md:mb-0"
          name="state"
          id="state"
          register={register}
        />
        <Input
          label="Zip:"
          placeholder="45678"
          type="number"
          className="md:max-w-40 mb-4 md:mb-0"
          name="zip_code"
          id="zip_code"
          register={register}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Insurance:"
          placeholder="eg. Health Insurance"
          className="md:mr-4 mb-4 md:mb-0"
          name="insurance"
          id="insurance"
          register={register}
        />
        <Input
          label="Insurance Email:"
          placeholder="example@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          name="insurance_email"
          id="insurance_email"
          register={register}
        />
        <Input
          label="Claim Number:"
          placeholder="23232323"
          type="number"
          className="md:mr-4 mb-4 md:mb-0"
          name="claim_number"
          id="claim_number"
          register={register}
        />
        <Input
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          className="mb-4 md:mb-0"
          name="policy_number"
          register={register}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Supplier ID:"
          placeholder="7632456"
          type="number"
          className="mb-4 md:mb-0 "
          name="supplier_id"
          register={register}
        />
        <Input
          label="Material:"
          placeholder="7632456"
          type="text"
          className="mb-4 md:mb-0 ml-4"
          name="materials"
          register={register}
        />
      </InputContainer>
    </div>
  );
};

export default CustomerInformation;
