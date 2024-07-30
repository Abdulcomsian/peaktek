import { TextBox } from "@components/FormControls";
import React, { Fragment } from "react";

const Depreciation = () => {
  return (
    <Fragment>
      <h2 className="text-black text-xl font-medium mb-4">Depreciation</h2>
      <p className="font-poppins text-sm leading-6">
        We request that the depreciation on this loss claim be released to
        <span className="inline-flex items-center mx-2">
          <TextBox className="inline-block w-full max-w-xs" />
        </span>
        as the work has been completed and meets all requirements set forth by
        the insurance policy. We have thoroughly inspected the completed work
        and ensured that it meets all of the standards set forth by the
        insurance policy.
      </p>
    </Fragment>
  );
};

export default Depreciation;
