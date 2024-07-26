import React, { Fragment, useState } from "react";
import { AdjustorForm } from "@components/Forms";
import Button from "@components/JobDetails/ui/Button";

const AdjustorMeeting = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Adjustor Meeting
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <AdjustorForm />
        <div className="flex">
          <Button className="text-black mr-4 border border-gray-300 px-4 py-1">
            Cancel
          </Button>
          <Button
            type="submit"
            className={`text-white btn-gradient px-4 py-1 ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving" : "Save"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
