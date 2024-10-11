import { CustomerInformation } from "@components/Forms";
import BSDeliveryInformation from "@components/Forms/BSDeliveryInfo";
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
import { Button } from "@components/UI";
import { getMaterialOrder } from "@services/apiMaterialOrder";

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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const resp = await getMaterialOrder(id);
      console.log("Material Order resp", resp);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.material_order;
      } else {
        return {
          materials: [{ material: "", quality: "", color: "", orderKey: "" }],
        };
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsCreating(true);
      const response = await materialOrderForm(data, id);
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
      <SupplierInfo register={register} setValue={setValue} errors={errors} />
      <h2 className="text-black text-xl font-medium my-4 pt-4 font-poppins">
        Delivery Information
      </h2>
      <BSDeliveryInformation
        className="pb-4 border-b border-gray-300"
        register={register}
        control={control}
      />
      <MaterialListForm register={register} control={control} />
      <Button
        variant="gradient"
        onClick={handleSubmit(onSubmit)}
        type="submit"
        disabled={isCreating} // Disable while submitting
      >
        {isCreating ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default MOForm;
