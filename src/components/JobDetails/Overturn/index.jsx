import React, { Fragment } from "react";
import { OverturnAttachments, OverturnForm } from "@components/Forms";
const Overturn = () => {
  return (
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Overturn Page
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <OverturnForm />
        <OverturnAttachments />
      </div>
    </Fragment>
  );
};

export default Overturn;
