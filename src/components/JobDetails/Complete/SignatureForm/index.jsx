import { InputContainer, CustomDatePicker } from "@components";
import { DateSelector, Input, TextBox } from "@components/FormControls";

const SignatureForm = ({ register, control, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <Input
          label="Company Representative:"
          placeholder="john Snow"
          className="md:mr-4 mb-4 md:mb-0"
          name="company_representative"
          register={register}
          applyMarginBottom={true}
        />
        <Input
          label="Printed Name:"
          placeholder="john Doe"
          className="md:mr-4 mb-4 md:mb-0"
          name="company_printed_name"
          applyMarginBottom={true}
        />
        <CustomDatePicker
          label="Date Signed"
          className="mb-4 md:mb-0"
          control={control}
          name="company_signed_date"
          // error={errors.date && formateErrorName(errors?.date?.message)}
        />
      </InputContainer>
    </div>
  );
};

export default SignatureForm;
