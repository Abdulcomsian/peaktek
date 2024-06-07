import React from "react";
import CustomerInformationForm from "../../components/Forms/CustomerInformation";
import Container from "../../components/Container";
import DeliveryInformationForm from "../../components/Forms/DeliveryInformation";
import AddMaterialForm from "../../components/Forms/AddMaterial";

const MaterialOrderPage = () => {
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        CUSTOMER INFORMATION
      </h1>
      <CustomerInformationForm />
      <h2 className="text-black text-xl font-semibold mb-4">
        DELIVERY INFORMATION
      </h2>
      <DeliveryInformationForm />
      <AddMaterialForm />
    </Container>
  );
};

export default MaterialOrderPage;
