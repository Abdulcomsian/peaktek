import React, { Fragment, useEffect, useRef, useState } from "react";
import { CustomerInformation, SignatureForm } from "@components/Forms";
import Button from "@components/JobDetails/Button";
import MaterialForm from "./Material";
import { useParams } from "react-router-dom";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { inProgressSchema } from "@services/schema";
import {
  FileIcon,
  GalleryIcon,
  ImageIcon,
  Tabs,
  TabsContentBox,
} from "@components/UI";
import { Ckeditor, FileUploader } from "@components/FormControls";

const InProgress = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { id } = useParams();
  const items = [
    { id: 1, title: "Notes", icon: <FileIcon className="mr-1" /> },
    { id: 2, title: "Photos", icon: <GalleryIcon className="mr-1" /> },
  ];

  useEffect(() => {
    dispatch(fetchSingleJob(id));
  }, [id]);

  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);
  console.log("Single Job", singleJobData);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      insurance: "",
      claim_number: "",
      policy_number: "",
      company_signature: "",
      company_printed_name: "",
      company_date: "",
      customer_signature: "",
      customer_printed_name: "",
      customer_date: "",
      materials: [{ material: "", damaged: false, notes: "" }],
      images: [], // This should be handled by FileUploader
      notes: "", // For CKEditor
    },
    // validationSchema: inProgressSchema,
    onSubmit: async (values, actions) => {
      const formattedValues = {
        ...values,
        company_date: values.company_date
          ? dayjs(values.company_date).format("DD/MM/YYYY")
          : "",
        customer_date: values.customer_date
          ? dayjs(values.customer_date).format("DD/MM/YYYY")
          : "",
        images: uploadedFiles.map((file) => file.file), // Ensure to pass file objects
      };
      console.log("Formatted Values", formattedValues);

      // Uncomment and adjust the following code for actual form submission
      // try {
      //   const token = localStorage.getItem("token");
      //   const response = await clientBaseURL.post(
      //     `${clientEndPoints?.createCoc}/${id}`,
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

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
    formik.setFieldValue(
      "images",
      files.map((file) => file.file)
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 1:
        return (
          <Ckeditor
            value={formik.values.notes}
            onChange={(content) => formik.setFieldValue("notes", content)}
            id="notes"
            label="Notes"
          />
        );
      case 2:
        return (
          <FileUploader
            icon={<ImageIcon />}
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your image here, or"
            files={uploadedFiles}
            setFiles={handleFilesChange}
          />
        );
      default:
        break;
    }
  };

  // Update Formik initial values when singleJobData changes
  useEffect(() => {
    if (singleJobData) {
      formik.setValues({
        ...formik.values,
        name: singleJobData?.name || "",
        email: singleJobData?.email || "",
        phone: singleJobData?.phone || "",
      });
    }
  }, [singleJobData]);

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    street: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zip_code: useRef(null),
    insurance: useRef(null),
    claim_number: useRef(null),
    policy_number: useRef(null),
    company_signature: useRef(null),
    company_printed_name: useRef(null),
    company_date: useRef(null),
    customer_signature: useRef(null),
    customer_printed_name: useRef(null),
    customer_date: useRef(null),
  };

  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      const firstErrorField = Object.keys(formik.errors).find(
        (field) => formik.touched[field] && formik.errors[field]
      );
      if (firstErrorField && inputRefs[firstErrorField]?.current) {
        inputRefs[firstErrorField].current.focus();
      }
    }
  }, [formik.isSubmitting, formik.isValid, formik.errors, formik.touched]);

  return (
    <Fragment>
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        In Progress
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <TabsContentBox contentTitle="Job Content" className="mb-4">
          <Tabs items={items} activeTab={activeTab} onClick={setActiveTab} />
          {renderActiveTab()}
        </TabsContentBox>
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Quality Control Form (QC)
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <CustomerInformation
            customer={singleJobData}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          />
          <MaterialForm
            values={formik.values.materials}
            setFieldValue={formik.setFieldValue}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched.materials}
            errors={formik.errors.materials}
          />
          <SignatureForm
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            inputRefs={inputRefs}
          />
          <div className="flex items-center mb-6">
            <input
              id="complete"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="complete"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Complete
            </label>
          </div>
          <div className="flex">
            <Button type="button" className="text-black mr-4 px-4 py-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`text-white btn-gradient px-4 py-1`}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default InProgress;
