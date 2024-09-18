import { CustomDatePicker, Input } from "@components/FormControls";
import React from "react";

export default function Footer({ register, control }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
      <div className="flex items-center md:mb-0 w-full md:max-w-md mb-4">
        <span className="mr-2">I</span>
        <Input
          className={`w-full md:mr-2`}
          placeholder="Customer Name"
          name="customer_name"
          id="customer_name"
          register={register}
        />
      </div>
      <span className="w-full inline-block md:mb-0 mb-4">
        the undersigned, hereby cancel this transaction as of{" "}
        <span className="font-bold">Date:</span>
      </span>
      <CustomDatePicker
        control={control}
        className={`w-full md:max-w-[27rem] md:ml-1`}
        placeholder="Signature Date"
        name="agreement_date"
      />
    </div>
  );
}
