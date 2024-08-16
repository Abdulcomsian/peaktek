import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Form } from "@components/FormControls";
import { CustomerInformation, DeliveryInformation } from "@components/Forms";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import AddMaterialForm from "./AddMaterialForm";
import { schedulingSchema } from "@services/schema";
import Button from "@components/JobDetails/Button";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Spin } from "antd";
import { Loader } from "@components/UI";
const Scheduling = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [materialOrderData, setMaterialOrderData] = useState(null);
  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);
  // Fetch Scheduling data
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        console.error("No token found");
        return;
      }
      setLoading(true);
      const response = await clientBaseURL.get(
        `${clientEndPoints?.getMaterialOrder}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response of get API in Scheduling", response);
      if (response?.status >= 200 && response?.status < 300) {
        setMaterialOrderData(response?.data?.material_order);
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
      dispatch(fetchSingleJob(id));
      fetchData();
    }
  }, [id, dispatch]);
  console.log("Material order data", materialOrderData);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      street: "",
      city: "",
      state: "",
      zip_code: "",
      insurance: "",
      claim_number: "",
      policy_number: "",
      date_needed: null,
      square_count: "",
      total_perimeter: "",
      build_date: null,
      ridge_lf: "",
      valley_sf: "",
      hip_and_ridge_lf: "",
      drip_edge_lf: "",
      materials: [{ material: "", quantity: "", color: "", order_key: "" }],
    },
    enableReinitialize: true,
    validationSchema: schedulingSchema,
    onSubmit: async (values, actions) => {
      const formattedValues = {
        ...values,
        date_needed: values.date_needed
          ? values.date_needed.format("DD/MM/YYYY")
          : "",
        build_date: values.build_date
          ? values.build_date.format("DD/MM/YYYY")
          : "",
      };
      console.log("Formatted values", formattedValues);
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createMaterialOrder}/${id}`,
          formattedValues,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response in Material order", response);
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

  const inputRefs = {
    street: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zip_code: useRef(null),
    insurance: useRef(null),
    claim_number: useRef(null),
    policy_number: useRef(null),
    date_needed: useRef(null),
    square_count: useRef(null),
    total_perimeter: useRef(null),
    build_date: useRef(null),
    ridge_lf: useRef(null),
    valley_sf: useRef(null),
    hip_and_ridge_lf: useRef(null),
    drip_edge_lf: useRef(null),
  };

  // Update Formik initial values when materialOrderData changes
  useEffect(() => {
    if (materialOrderData) {
      formik.setValues({
        street: materialOrderData.street || "",
        city: materialOrderData.city || "",
        state: materialOrderData.state || "",
        zip_code: materialOrderData.zip_code || "",
        insurance: materialOrderData.insurance || "",
        claim_number: materialOrderData.claim_number || "",
        policy_number: materialOrderData.policy_number || "",
        date_needed: materialOrderData.date_needed
          ? dayjs(materialOrderData.date_needed, "DD/MM/YYYY")
          : null,
        square_count: materialOrderData.square_count || "",
        total_perimeter: materialOrderData.total_perimeter || "",
        build_date: materialOrderData.build_date
          ? dayjs(materialOrderData.build_date, "DD/MM/YYYY")
          : null,
        ridge_lf: materialOrderData.ridge_lf || "",
        valley_sf: materialOrderData.valley_sf || "",
        hip_and_ridge_lf: materialOrderData.hip_and_ridge_lf || "",
        drip_edge_lf: materialOrderData.drip_edge_lf || "",
        materials: materialOrderData.materials?.map((material) => ({
          material: material.material || "",
          quantity: material.quantity || "",
          color: material.color || "",
          order_key: material.order_key || "",
        })) || [{ material: "", quantity: "", color: "", order_key: "" }],
      });
    }
  }, [materialOrderData]);

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
    <div className="bg-white p-5 rounded-2xl w-full max-w-7xl">
      {loading && <Spin fullscreen={true} />}
      <Form onSubmit={formik.handleSubmit}>
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Material Order
        </h2>
        <CustomerInformation
          className="pb-4 border-b border-gray-300"
          customer={singleJobData}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          touched={formik.touched}
          errors={formik.errors}
          values={formik.values}
          setFieldValue={formik.setFieldValue}
          inputRefs={inputRefs}
          readOnlyFields={["name", "email", "phone"]}
        />
        <h2 className="text-black text-xl font-medium mb-4 pt-4 font-poppins">
          Delivery Information
        </h2>
        <DeliveryInformation
          className="pb-4 border-b border-gray-300"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          touched={formik.touched}
          errors={formik.errors}
          values={formik.values}
          setFieldValue={formik.setFieldValue}
          inputRefs={inputRefs}
        />
        <AddMaterialForm
          className="mb-4 pt-4"
          values={formik.values.materials}
          setFieldValue={formik.setFieldValue}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          touched={formik.touched.materials}
          errors={formik.errors.materials}
        />

        <div className="flex justify-center md:justify-start">
          <Button type="button" className="text-black mr-4 px-4 py-1">
            Update
          </Button>
          <Button
            disabled={formik?.isSubmitting}
            type="submit"
            className={`text-white btn-gradient px-4 py-1`}
          >
            {formik?.isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"28px"} height={"28px"} color="#fff" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Scheduling;
