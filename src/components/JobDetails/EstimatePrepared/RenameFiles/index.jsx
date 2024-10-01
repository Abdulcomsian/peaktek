import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Form, TextBox } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { baseURL, clientBaseURL, clientEndPoints } from "@services/config";
import { useFormik } from "formik";
import { renameFilesSchema } from "@services/schema";
import { Loader } from "@components/UI";
import { RiDeleteBin6Line } from "react-icons/ri";
const RenameFiles = ({ file, id, refreshData }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,

    setValues,
  } = useFormik({
    initialValues: {
      file_name: "", // Initialize with the file name or an empty string
    },
    enableReinitialize: true,
    validationSchema: renameFilesSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.changeEstimatePreparedFilename}/${id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
          if (refreshData) {
            refreshData(); // Trigger the data refresh in MediaContent
          }
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
  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${file?.media_url}`;
    window.open(fullFileUrl, "_blank");
  };
  useEffect(() => {
    if (file) {
      setValues({
        file_name: file?.file_name || "", // Set the file name in the form
      });
    }
  }, []);
  const deleteFilehandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await clientBaseURL.post(
        `${clientEndPoints?.deleteEstimatePreparedMedia}/${id}`,
        { image_url: file?.media_url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
        if (refreshData) {
          await refreshData(); // Refresh the data after deletion
        }
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    }
  };
  return (
    <Form
      className="flex flex-col md:flex-row mb-4 max-w-full"
      onSubmit={handleSubmit}
    >
      <TextBox
        placeholder={`Enter file name`}
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
      <div className="w-full flex justify-center md:justify-start">
        <Button
          type="button"
          className="w-full max-w-28 text-center bg-green-500 hover:bg-green-700 px-4 py-1 mr-4 h-11 text-white"
          onClick={openFileHandler}
        >
          View File
        </Button>

        <Button
          className="w-full max-w-28 text-center text-white btn-gradient px-4 py-1  mr-4 h-11"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <Loader width={"24px"} height={"24px"} color="#fff" />
            </div>
          ) : (
            "Save"
          )}
        </Button>
        <Button
          type="button"
          className="text-center bg-red-100 hover:bg-red-500 text-red-600 hover:text-white px-4 py-1 h-11"
          onClick={deleteFilehandler}
        >
          <RiDeleteBin6Line size={20} className="text-inherit" />
        </Button>
      </div>
    </Form>
  );
};

export default RenameFiles;
