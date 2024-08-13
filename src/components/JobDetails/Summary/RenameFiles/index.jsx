import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Form, TextBox } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { baseURL, clientBaseURL, clientEndPoints } from "@services/config";
import { useFormik } from "formik";
import { renameFilesSchema } from "@services/schema";

const RenameFiles = ({ file, id }) => {
  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${file?.media_url}`;
    window.open(fullFileUrl, "_blank");
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      file_name: file?.file_name || "", // Initialize with the file name or an empty string
    },
    enableReinitialize: true,
    validationSchema: renameFilesSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.updateJobContentFileName}/${id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
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

  useEffect(() => {
    if (file) {
      setValues({
        file_name: file?.file_name || "", // Set the file name in the form
      });
    }
  }, [file, setValues]);

  return (
    <Form className="flex flex-col md:flex-row mb-4" onSubmit={handleSubmit}>
      <TextBox
        placeholder={`Enter file ${file?.id} name`}
        type="text"
        id="file_name"
        name="file_name"
        className="md:mr-4 mb-4 md:mb-0 md:max-w-sm"
        value={values?.file_name}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors?.file_name}
        touched={touched?.file_name}
      />
      <div className="flex justify-center">
        <Button
          type="button"
          className="bg-green-500 hover:bg-green-700 px-4 py-1 mr-4 text-white"
          onClick={openFileHandler}
        >
          View File
        </Button>
        <Button className="text-white btn-gradient px-4 py-1" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default RenameFiles;
