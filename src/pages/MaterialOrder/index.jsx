import React from "react";
import CustomerInformationForm from "../../components/Forms/CustomerInformation";
import Container from "../../components/Container";
import DeliveryInformationForm from "../../components/Forms/DeliveryInformation";

const MaterialOrderPage = () => {
  return (
    <Container className="my-4 mx-6 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        CUSTOMER INFORMATION
      </h1>
      <CustomerInformationForm />
      <h2 className="text-black text-xl font-semibold mb-4">
        DELIVERY INFORMATION
      </h2>
      <DeliveryInformationForm />
    </Container>
  );
};

export default MaterialOrderPage;
