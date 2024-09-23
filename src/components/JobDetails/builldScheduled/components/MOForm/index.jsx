import { CustomerInformation } from "@components/Forms";
import BSDeliveryInformation from "@components/Forms/BSDeliveryInfo";
import { Button } from "@components/UI";
import { materialOrderForm } from "@services/apiBuildScheduled";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const MOForm = () => {
  const { id } = useParams();
  const [isCreating, setIsCreating] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Preparing materials as an array of objects
    const materialsArray = [
      {
        material: "test 1",
        quantity: 3,
        order_key: "anything",
      },
      {
        material: "test 2",
        quantity: 3,
        order_key: "anything",
      },
    ];

    // Preparing the data object to match the API's expected format
    const preparedData = {
      street: data.street || "test",
      city: data.city || "test",
      state: data.state || "test",
      zip_code: data.zip_code || 40100,
      claim_number: data.claim_number || 10100,
      policy_number: data.policy_number || 10010,
      insurance: data.insurance || "test",
      date_needed: data.date_needed || "12/07/2024",
      square_count: data.square_count || "anything",
      total_perimeter: data.total_perimeter || "anything",
      build_date: data.build_date || "12/07/2024",
      ridge_lf: data.ridge_lf || "anything",
      valley_sf: data.valley_sf || "anything",
      hip_and_ridge_lf: data.hip_and_ridge_lf || "anything",
      drip_edge_lf: data.drip_edge_lf || "anything",
      supplier_id: data.supplier_id || 10,
      supplier: data.supplier || "test supplier",
      materials: materialsArray,
    };

    try {
      setIsCreating(true);

      const response = await materialOrderForm(preparedData, id);
      console.log("Material Order Form===>", response);

      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response.message);
      } else if (response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/");
      } else if (response?.status === 422) {
        toast.error(response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Material Order Form Submission error:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <h2 className="text-black text-xl font-medium mb-4 font-poppins">
        Material Order
      </h2>
      <CustomerInformation
        className="pb-4 border-b border-gray-300"
        register={register}
        control={control}
        readOnlyFields={["name", "email", "phone"]}
      />
      <h2 className="text-black text-xl font-medium mb-4 pt-4 font-poppins">
        Delivery Information
      </h2>
      <BSDeliveryInformation
        className="pb-4 border-b border-gray-300"
        register={register}
        control={control}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </Button>
    </div>
  );
};

export default MOForm;
