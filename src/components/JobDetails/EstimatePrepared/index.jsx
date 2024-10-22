import React, { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Form } from "@components/FormControls";
// import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { EstimatePreparedForm } from "@components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loader } from "@components/UI";
import { estimatePreparedSchema } from "@services/schema";
import { Spin } from "antd";
import RenameFiles from "./RenameFiles";
import { useAuth } from "@context/AuthContext";

const EstimatePrepared = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estimatePreparedData, setEstimatePreparedData] = useState(null);
  const [showRenameBox, setShowRenameBox] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const getEstimatePreparedData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
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
        setEstimatePreparedData({
          ...response?.data?.data,
          status: response?.data?.data?.status === "true",
        });
        setShowRenameBox(true);
      }
      if (response?.status === 401) {
        logout();
        navigate("/");
      }
    } catch (error) {
      if (error?.response) {
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
      status: false,
      date: null,
    },
    enableReinitialize: true,
    validationSchema: estimatePreparedSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      const formattedDate = dayjs(values.date).format("MM/DD/YYYY");

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
        if (response?.status === 401) {
          logout();
          navigate("/");
        }
      } catch (error) {
        if (error?.status === 401) {
          logout();
          navigate("/");
        }
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

      console.log("inside the effct", estimatePreparedData);

      formik.setValues({
        prepared_by: estimatePreparedData.prepared_by || "",
        status: estimatePreparedData?.status,
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
            variant="gradient"
            disabled={formik?.isSubmitting}
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
