import { Input } from "@components/FormControls";
import React from "react";

const COC = ({ register, error }) => {
  return (
    <div className="mb-4">
      <h2 className="text-black text-xl font-medium mb-2">
        Certificate of Completion
      </h2>
      <p className="font-poppins text-sm leading-7">
        This certificate of completion is hereby awarded to
        <span className="inline-flex items-center mx-2">
          <Input
            className={`px-2 py-1 outline-none text-gray-900 text-sm rounded-md inline-block w-full max-w-xs`}
            name="awarded_to"
            id="awarded_to"
            register={register}
            placeholder="Enter award to value"
          />
        </span>
        for the successful completion of the loss stated above. This project was
        completed by SOUTHERN ROOFING AND RENOVATIONS, LICENSE # 73775, a
        licensed general contractor in the state of Tennessee, in accordance
        with all relevant laws and regulations. We certify that all work on this
        project was completed in compliance with Tennessee law, which requires a
        licensed general contractor to supervise and manage the project. Our
        team of qualified professionals ensured that all work was done to the
        highest standards and met all relevant codes and regulations.
      </p>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default COC;
