import { Ckeditor, FileUploader } from "@components/FormControls";
import { OverturnForm } from "@components/Forms";
import { ArrowFileIcon, ImageIcon } from "@components/UI";
import React, { Fragment } from "react";
import Button from "@components/JobDetails/ui/Button";
import { useFormik } from "formik";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Form } from "@components/FormControls";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { overturnMeetingSchema } from "@services/schema";
const Overturn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      time: null,
      date: null,
    },
    validationSchema: overturnMeetingSchema,
    onSubmit: async (values, actions) => {
      // Format time with leading zero for single-digit hours and include AM/PM
      const formattedTime = values.time
        ? dayjs(values.time).format("hh:mm A")
        : "Invalid Time";

      // Format date to 'DD/MM/YYYY'
      const formattedDate = dayjs(values.date).format("DD/MM/YYYY");

      // Prepare the data to send to the server
      const formattedValues = {
        ...values,
        time: formattedTime,
        date: formattedDate,
      };
      console.log("Formated values", formattedValues);
      // try {
      //   const token = localStorage.getItem("token");
      //   const response = await clientBaseURL.post(
      //     `${clientEndPoints?.createAdjustorMeeting}/1`,
      //     formattedValues,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      //   if (response?.status >= 200 && response?.status < 300) {
      //     toast.success(response?.data?.message);
      //     actions.resetForm();
      //   }
      // } catch (error) {
      //   if (error?.response) {
      //     toast.error(
      //       error?.response?.data?.error || error?.response?.data?.message
      //     );
      //   }
      // }
    },
  });
  return (
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Overturn Page
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <Form onSubmit={formik?.handleSubmit} className="mb-4">
          <OverturnForm
            className="mb-4"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          />
          <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
            Submit
          </Button>
        </Form>
        <div className="flex flex-col md:flex-row">
          <FileUploader
            label="Images"
            id="images"
            icon={<ImageIcon />}
            className="w-full mb-4 mr-4"
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your image here, or"
            files={""}
            setFiles={""}
            handleDelete={""}
          />
          <FileUploader
            label="Documents"
            id="documents"
            icon={<ArrowFileIcon />}
            className="w-full mb-4"
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your documents here, or"
            files={""}
            setFiles={""}
            handleDelete={""}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <FileUploader
            label="Manufacturer Document"
            id="manufacturer_document"
            icon={<ArrowFileIcon />}
            className="w-full mb-4 mr-4"
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your documents here, or"
            files={""}
            setFiles={""}
            handleDelete={""}
          />
          <Ckeditor
            className="w-full max-w-2xl mb-4"
            label="Notes"
            id="notes"
          />
        </div>

        <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
          Save
        </Button>
      </div>
    </Fragment>
  );
};

export default Overturn;
