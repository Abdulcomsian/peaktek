import React from "react";
import { Container } from "@components";
import {
  AddMaterialForm,
  DeliveryInformationForm,
  CustomerInformationForm,
} from "@components/Forms";
import ShowSignatureModalBtn from "@components/Signature/ShowSignatureModalBtn";

const MaterialOrder = ({ register }) => {
  return (
    <Container className="max-w-screen-lg my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <ShowSignatureModalBtn />
      <h1 className="text-black text-xl font-semibold mb-4 uppercase">
        Material order
      </h1>
      <CustomerInformationForm register={register} />
      <h2 className="text-black text-xl font-semibold mb-4">
        DELIVERY INFORMATION
      </h2>
      <DeliveryInformationForm />
      <AddMaterialForm />
    </Container>
  );
};

export default MaterialOrder;
