import { AdjustorForm } from "@components/Forms";
import React, { Fragment } from "react";

const AdjustorMeeting = () => {
  return (
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4">
        Adjustor Meeting
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <AdjustorForm />
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
