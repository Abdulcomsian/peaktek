import React, { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Form } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { EstimatePreparedForm } from "@components/Forms";
import { useParams } from "react-router-dom";
import { Loader } from "@components/UI";
import { estimatePreparedSchema } from "@services/schema";
import { Spin } from "antd";
import RenameFiles from "./RenameFiles";

const EstimatePrepared = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estimatePreparedData, setEstimatePreparedData] = useState(null);
  const [showRenameBox, setShowRenameBox] = useState(false);
  const getEstimatePreparedData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await clientBaseURL.get(
        `${clientEndPoints?.getEstimatePrepared}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        setEstimatePreparedData(response?.data?.data);
        setShowRenameBox(true);
      }
    } catch (error) {
      if (error?.response) {
        console.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getEstimatePreparedData();
    }
  }, [id]);
  const refreshData = () => {
    getEstimatePreparedData();
  };
  const formik = useFormik({
    initialValues: {
      prepared_by: "",
      complete_box: false,
      date: null,
    },
    enableReinitialize: true,
    validationSchema: estimatePreparedSchema,
    onSubmit: async (values, actions) => {
      const formattedDate = dayjs(values.date).format("DD/MM/YYYY");

      const formData = new FormData();
      formData.append("prepared_by", values.prepared_by);
      formData.append("complete_box", Boolean(values.complete_box));
      formData.append("date", formattedDate);

      // Append images to FormData
      images.forEach((file) => {
        formData.append("images[]", file.file);
      });

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createEstimatePrepared}/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
          actions.resetForm();
          setImages([]); // Reset images after successful submission
          getEstimatePreparedData(); // Call the function to repopulate the form
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
    if (estimatePreparedData) {
      const formattedDate = estimatePreparedData?.date
        ? dayjs(estimatePreparedData?.date, "DD/MM/YYYY")
        : null;

      formik.setValues({
        prepared_by: estimatePreparedData.prepared_by || "",
        complete_box: estimatePreparedData?.complete_box,
        date: formattedDate,
      });
    }
  }, [estimatePreparedData]);

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-6 font-poppins">
          Estimate Prepared
        </h2>
        <Form onSubmit={formik.handleSubmit} className="mb-4">
          <EstimatePreparedForm
            className="mb-4"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            images={images} // Pass images to the form
            setImages={setImages} // Pass setImages function to the form
          />

          <Button
            type="submit"
            disabled={formik?.isSubmitting}
            className={`w-full max-w-24 text-white btn-gradient px-4 py-1`}
          >
            {formik?.isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
        {showRenameBox &&
          estimatePreparedData?.images?.map((file) => (
            <RenameFiles
              file={file}
              key={file?.id}
              id={file?.id}
              refreshData={refreshData}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default EstimatePrepared;