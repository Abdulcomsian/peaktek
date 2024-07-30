import React, { useEffect } from "react";
import { Form } from "@components/FormControls";
import { CustomerInformation } from "@components/Forms";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import COC from "./COC";
import Depreciation from "./Depreciation";

const Complete = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleJob(id));
  }, [id]);

  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);
  return (
    <div>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        COC
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Customer Information
        </h2>
        <Form>
          <CustomerInformation
            customer={singleJobData}
            // handleChange={formik.handleChange}
            // handleBlur={formik.handleBlur}
            // touched={formik.touched}
            // errors={formik.errors}
            // values={formik.values}
            // setFieldValue={formik.setFieldValue}
            // inputRefs={inputRefs} // Pass refs to the component
          />
          <COC />
          <Depreciation />
        </Form>
      </div>
    </div>
  );
};

export default Complete;
