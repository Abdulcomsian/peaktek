import { useSelector } from "react-redux";
import { InputContainer } from "@components";
import { Input } from "@components/FormControls";

export default function CustomerInformationDetail({
  register,
  className,
  isCustomerAggrementInfo = false,
}) {
  // Destructure with default empty strings for each field in case insuranceSummary or job is missing
  //   const {
  //     insurance = "",
  //     claim_number = "",
  //     policy_number = "",
  //   } = insuranceSummary?.job || {};
  //   console.log("insurance summary", insuranceSummary);
  //   const { name, email, phone } =
  //     useSelector((state) => state?.jobs?.singleJobData) || {};

  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Name:"
          placeholder="John Doe"
          className="md:mr-4 mb-4 md:mb-0"
          disabled={true}
          name="name"
          id="name"
          register={register}
        />
        <Input
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          disabled={true}
          name="email"
          id="email"
          register={register}
        />
        <Input
          label="Phone:"
          placeholder="923081177825"
          className="mb-4 md:mb-0"
          disabled={true}
          name="phone"
          id="phone"
          register={register}
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
          disabled={isCustomerAggrementInfo}
        />
        <Input
          label="Claim Number:"
          placeholder="23232323"
          className="md:mr-4 mb-4 md:mb-0"
          name="claim_number"
          id="claim_number"
          register={register}
          disabled={isCustomerAggrementInfo}
        />
        <Input
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          className="mb-4 md:mb-0"
          name="policy_number"
          register={register}
          disabled={isCustomerAggrementInfo}
        />
      </InputContainer>
    </div>
  );
}
