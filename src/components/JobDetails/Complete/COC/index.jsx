import { TextBox } from "@components/FormControls";
import React, { Fragment } from "react";

const COC = () => {
  return (
    <Fragment>
      <h2 className="text-black text-xl font-medium mb-4">
        Certificate of Completion
      </h2>
      <p className="font-poppins text-sm leading-6">
        This certificate of completion is hereby awarded to
        <span className="inline-flex items-center mx-2">
          <TextBox className="inline-block w-full  max-w-xs" />
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
    </Fragment>
  );
};

export default COC;
