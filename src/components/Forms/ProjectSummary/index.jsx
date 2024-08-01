import React from "react";
import { InputContainer } from "@components";
import { TextBox } from "@components/FormControls";
const ProjectSummaryForm = ({
  className,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="Job Total :"
          placeholder="type"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          id="job_total"
          name="job_total"
          value={values?.job_total}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.job_total}
          touched={touched?.job_total}
        />
        <TextBox
          label="Customer Paid Upgrades :"
          placeholder="type"
          type="number"
          className="md:mr-4  mb-4 md:mb-0"
          id="customer_paid_upgrades"
          name="customer_paid_upgrades"
          value={values?.customer_paid_upgrades}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.customer_paid_upgrades}
          touched={touched?.customer_paid_upgrades}
        />
        <TextBox
          label="Deductible :"
          placeholder="type"
          type="text"
          className="mb-4 md:mb-0"
          id="deductible"
          name="deductible"
          value={values.deductible}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.deductible}
          touched={touched?.deductible}
        />
      </InputContainer>
      <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
        <TextBox
          label="ACV Check :"
          placeholder="type"
          type="text"
          className="md:mr-4  mb-4 md:mb-0"
          id="acv_check"
          name="acv_check"
          value={values?.acv_check}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.acv_check}
          touched={touched?.acv_check}
        />
        <TextBox
          label="RCV Check :"
          placeholder="type"
          type="text"
          className="md:mr-4  mb-4 md:mb-0"
          id="rcv_check"
          name="rcv_check"
          value={values?.rcv_check}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.rcv_check}
          touched={touched?.rcv_check}
        />
        <TextBox
          label="Supplemental Items :"
          placeholder="type"
          type="text"
          className="mb-4 md:mb-0"
          id="supplemental_items"
          name="supplemental_items"
          value={values?.supplemental_items}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.supplemental_items}
          touched={touched?.supplemental_items}
        />
      </InputContainer>
    </div>
  );
};

export default ProjectSummaryForm;
