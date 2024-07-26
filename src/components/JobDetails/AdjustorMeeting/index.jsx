import React, { Fragment } from "react";
import { useFormik } from "formik";
import { adjustorMeetingSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Form } from "@components/FormControls";
import Button from "@components/JobDetails/ui/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { AdjustorForm } from "@components/Forms";

const AdjustorMeeting = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      time: null,
      date: null,
    },
    validationSchema: adjustorMeetingSchema,
    onSubmit: async (values, actions) => {
      const formatPhone = values?.phone.toString();

      // Format time with leading zero for single-digit hours and include AM/PM
      const formattedTime = values.time
        ? dayjs(values.time).format("hh:mm A")
        : "Invalid Time";

      // Format date to 'DD/MM/YYYY'
      const formattedDate = dayjs(values.date).format("DD/MM/YYYY");

      // Prepare the data to send to the server
      const formattedValues = {
        ...values,
        phone: formatPhone,
        time: formattedTime,
        date: formattedDate,
      };
      console.log("Formated values", formattedValues);
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createAdjustorMeeting}/1`,
          formattedValues,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
          actions.resetForm();
        }
      } catch (error) {
        if (error?.response) {
          toast.error(
            error?.response?.data?.error || error?.response?.data?.message
          );
        }
      }
    },
  });

  return (
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Adjustor Meeting
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <Form onSubmit={formik.handleSubmit}>
          <AdjustorForm
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          />
          <div className="flex">
            <Button className="text-black mr-4 border border-gray-300 px-4 py-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`text-white btn-gradient px-4 py-1`}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
