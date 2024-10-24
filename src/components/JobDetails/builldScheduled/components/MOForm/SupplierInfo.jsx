import { CheckBox } from "@components/FormControls";
import { Input, InputContainer } from "@components/index";
import { formatPhoneNumber } from "../../../../../utils/helper";

export default function SupplierInfo({
  register,
  className,
  setValue,
  errors,
}) {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Name:"
          placeholder="John Doe"
          className="md:mr-4 mb-4 md:mb-0"
          register={register}
          disabled={true}
          name="name"
          id="name"
        />
        <Input
          label="Email:"
          placeholder="john@gmail.com"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          register={register}
          disabled={true}
          name="email"
          id="email"
        />
        <Input
          label="Phone:"
          disabled={true}
          placeholder="923081177825"
          className="mb-4 md:mb-0"
          register={register}
          name="phone"
          id="phone"
          format="phone"
          numberOnly={true}
          maxLength={12}
          onChange={(e) => {
            setValue("phone", formatPhoneNumber(e.target.value));
          }}
          validate={(value) => {
            return (
              value.length === 12 || "number should be maximun of 10 numbers"
            );
          }}
          error={errors?.phone?.message && <p>{errors?.phone?.message}</p>}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          disabled={true}
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
          disabled={true}
          register={register}
        />
        <Input
          label="State:"
          placeholder="NY"
          className="md:mr-4 md:max-w-40 mb-4 md:mb-0"
          name="state"
          id="state"
          disabled={true}
          register={register}
        />
        <Input
          label="Zip:"
          placeholder="45678"
          type="number"
          disabled={true}
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
          disabled={true}
        />
        <Input
          label="Claim Number:"
          placeholder="23232323"
          className="md:mr-4 mb-4 md:mb-0"
          name="claim_number"
          id="claim_number"
          register={register}
          disabled={true}
        />
        <Input
          label="Policy Number:"
          placeholder="7632456"
          type="number"
          className="mb-4 md:mb-0"
          name="policy_number"
          register={register}
          disabled={true}
        />
      </InputContainer>
    </div>
  );
}
