import { Input } from "@components/FormControls";
import React from "react";

const Conclusion = ({ register }) => {
  return (
    <div className="mb-4">
      <h2 className="text-black text-xl font-medium mb-2">Conclusion</h2>
      <p className="font-poppins text-sm leading-7 mb-4">
        We would like to thank
        <span className="inline-flex items-center mx-2 border-b-2 border-dashed border-gray-900  outline-none text-gray-900 text-sm">
          <Input
            register={register}
            name="conclusion"
            id="conclusion"
            className=" !border-none !border-0 inline-block w-full  max-w-xs"
          />
        </span>
        for the opportunity to work on this project. We take great pride in our
        work and are pleased to have been able to provide quality construction
        services. We believe that the completed work meets all requirements set
        forth by the insurance policy and Tennessee law, and we request that the
        depreciation be released and overhead and profit be included in the
        final claim settlement.
      </p>
      <Input
        label="Sincerely,"
        applyMarginBottom={true}
        register={register}
        name="sincerely"
        id="sincerely"
        className="w-[50%]"
      />
    </div>
  );
};

export default Conclusion;
