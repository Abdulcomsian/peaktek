import { CustomerInformation } from "@components/Forms";
import BSDeliveryInformation from "@components/Forms/BSDeliveryInfo";
import { Button } from "@components/UI";
import { materialOrderForm } from "@services/apiBuildScheduled";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchUsersData } from "@store/slices/usersSlice";
import { useSelector } from "react-redux";
import { getSuppliers } from "@services/apiSuppliers";
import ClientInformation from "@components/JobDetails/Complete/COCForm/ClientInformation";
import SupplierInfo from "./SupplierInfo";
import MaterialListForm from "./MaterialListForm";

const MOForm = () => {
  const { id } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const usersData = useSelector((state) => state?.users?.usersData);
  const [suppliers, setSuppliers] = useState([]);
  const fetchSupplier = async () => {
    try {
      const response = await getSuppliers(id);
      setSuppliers(response.user);
    } catch (e) {}
  };
  useEffect(() => {
    fetchSupplier();
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const preparedData = {
      street: data.street,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
      claim_number: data.claim_number,
      policy_number: data.policy_number,
      insurance: data.insurance,
      date_needed: data.date_needed, // from BSDeliveryInformation
      square_count: data.square_count, // from BSDeliveryInformation
      total_perimeter: data.total_perimeter, // from BSDeliveryInformation
      build_date: data.build_date, // from BSDeliveryInformation
      ridge_lf: data.ridge_lf, // from BSDeliveryInformation
      valley_sf: data.valley_sf, // from BSDeliveryInformation
      hip_and_ridge_lf: data.hip_and_ridge_lf, // from BSDeliveryInformation
      drip_edge_lf: data.drip_edge_lf, // from BSDeliveryInformation
      supplier_id: 123,
      materials: [
        {
          material: "test 1",
          quantity: 3,
          // "color": "red",
          order_key: "anything",
        },
        {
          material: "test 2",
          quantity: 3,
          color: "blue",
          order_key: "anything",
        },
      ],
    };

    try {
      setIsCreating(true);
      const response = await materialOrderForm(preparedData, id);
      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit the form.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <h2 className="text-black text-xl font-medium mb-4 font-poppins">
        Material Order
      </h2>
      {/* <CustomerInformation
        className="pb-4 border-b border-gray-300"
        register={register}
        control={control}
        readOnlyFields={["name", "email", "phone"]} // Optional: if you want to make them readonly
      /> */}
      <SupplierInfo register={register} />
      <h2 className="text-black text-xl font-medium my-4 pt-4 font-poppins">
        Delivery Information
      </h2>
      <BSDeliveryInformation
        className="pb-4 border-b border-gray-300"
        register={register}
        control={control}
      />
      <MaterialListForm />
      <Button
        onClick={handleSubmit(onSubmit)}
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        disabled={isCreating} // Disable while submitting
      >
        {isCreating ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default MOForm;
