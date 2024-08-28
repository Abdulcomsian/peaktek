import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Form, SelectBox } from "@components/FormControls";
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
import { InputContainer } from "@components";
import { fetchSupplierData } from "@store/slices/suppliersSlice";
const Scheduling = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [materialOrderData, setMaterialOrderData] = useState(null);
  const singleJobData = useSelector((state) => state?.jobs?.singleJobData);
  const suppliersData = useSelector((state) => state?.suppliers?.supplierData);
  useEffect(() => {
    dispatch(fetchSupplierData());
  }, []);
  const supplierOptions =
    suppliersData?.map((supplier) => ({
      label: supplier?.name,
      value: supplier?.id,
    })) || [];

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
        `${clientEndPoints?.checkMaterialOrder}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        setMaterialOrderData(response?.data?.data);
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
      supplier_id: "",
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
        supplier_id: values.supplier_id,
      };

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

        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
          try {
            const res = await clientBaseURL.get(
              `${clientEndPoints?.emailToSupplier}/${id}`,

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res?.status >= 200 && res?.status < 300) {
              toast.success(res?.data?.message);
            }
          } catch (error) {
            if (error?.response) {
              toast.error(
                error?.response?.data?.error || error?.response?.data?.message
              );
            }
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
    supplier_id: useRef(null),
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
        supplier_id: materialOrderData.supplier_id || "",
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
        const fieldElement = inputRefs[firstErrorField].current;
        fieldElement.focus();
        fieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // Set the cursor inside the input field
        if (fieldElement.setSelectionRange) {
          // For text inputs
          const length = fieldElement.value.length;
          fieldElement.setSelectionRange(length, length);
        }
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

        <SelectBox
          label="Assigned to"
          placeholder="Select Supplier"
          className="mb-4 md:max-w-xl"
          name="supplier_id"
          options={supplierOptions}
          value={formik.values.supplier_id}
          onBlur={formik.handleBlur}
          onChange={(value) => formik.setFieldValue("supplier_id", value)}
          error={formik.errors.supplier_id}
          touched={formik.touched.supplier_id}
        />

        <div className="flex justify-center md:justify-start">
          <Button
            disabled={formik?.isSubmitting}
            type="submit"
            className="w-full max-w-24 text-white btn-gradient px-4 py-1"
          >
            {formik?.isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
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
