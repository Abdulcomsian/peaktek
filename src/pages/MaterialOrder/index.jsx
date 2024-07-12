import React, { useEffect, useState } from "react";
import { Container } from "@components";
import {
  AddMaterialForm,
  DeliveryInformationForm,
  CustomerInformationForm,
} from "@components/Forms";
import { useForm } from "react-hook-form";
import {
  checkMaterialOrderApi,
  createMaterialOrder,
} from "@services/apiMaterialOrder";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { Button } from "@components/UI";
import { z } from "zod";

const schema = {};

const MaterialOrder = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const { id: materialOrderId, ...defaultValuesform } = defaultValues;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control } = useForm({
    defaultValues: materialOrderId && isEditting ? defaultValuesform : {},
  });

  const onSubmit = async function (data) {
    const mapedData = {
      materials: [],
    };
    Object.keys(data).forEach((key) => {
      if (
        key.startsWith("color-") ||
        key.startsWith("material-") ||
        key.startsWith("order_key-") ||
        key.startsWith("quantity-")
      ) {
        const keyMaped = key.slice(0, key.indexOf("-"));
        const targetIndex = +key.slice(-1);
        const materials = mapedData.materials;
        if (materials[targetIndex]) {
          materials[targetIndex][keyMaped] = data[key];
        } else {
          materials.push({ [keyMaped]: data[key] });
        }
      } else {
        mapedData[key] = data[key];
      }
    });

    const finalDataToLoad = {
      ...mapedData,
      build_date: new Date(mapedData.build_date.$d).toLocaleDateString(),
      date_needed: new Date(mapedData.date_needed.$d).toLocaleDateString(),
    };

    setIsSubmitting(true);
    try {
      const resp = await createMaterialOrder(finalDataToLoad, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function checkMaterialOrder() {
      try {
        setIsLoading(true);
        const resp = await checkMaterialOrderApi(jobId);
        setIsLoading(false);
        if (resp.status === 200 && Object.keys(resp.data).length > 0) {
          // console.log("EDITING MODE", resp.data);
          setIsEditting(true);
          setDefaultValues(resp.data);
        } else if (resp.status === 422) {
          toast.error("Corresponding Job not found.");
          navigate("/dashboard");
        } else {
          setIsEditting(false);
          setDefaultValues({});
        }
      } finally {
      }
    }

    if (jobId) checkMaterialOrder();
  }, [jobId]);

  const onerror = function (error) {
    console.log(error);
  };
  if (isLoading) return <Spin fullscreen />;
  return (
    <Container className="max-w-screen-lg my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] relative">
      {/* <ShowSignatureModalBtn /> */}
      <h1 className="text-black text-xl font-semibold mb-4 uppercase">
        Material order
      </h1>
      <form onSubmit={handleSubmit(onSubmit, onerror)}>
        <Button
          type="submit"
          variant="gradient"
          className="absolute top-5 right-5 min-w-[100px] inline-block"
          disabled={isSubmitting}
        >
          {!isSubmitting ? isEditting ? "Update" : "Submit" : <Spin />}
        </Button>
        <CustomerInformationForm
          register={register}
          defaultValue={defaultValues}
          disabled={isLoading}
        />
        <h2 className="text-black text-xl font-semibold mb-4">
          DELIVERY INFORMATION
        </h2>
        <DeliveryInformationForm
          control={control}
          register={register}
          defaultValue={defaultValues}
          disabled={isLoading}
        />
        <AddMaterialForm
          register={register}
          control={control}
          defaultValue={defaultValues}
        />
      </form>
    </Container>
  );
};

export default MaterialOrder;
