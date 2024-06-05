import React from "react";
import CustomerInformationForm from "../../components/Forms/CustomerInformation";
import Container from "../../components/Container";
import {
  warrantyDuration,
  notificationOfIssuance,
  damageData,
  limitationsOfLiability,
  maintenanceData,
} from "../../assets/data";
const WarrantyInformationPage = () => {
  return (
    <Container className="my-4 mx-6 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h1 className="text-black text-xl font-semibold mb-4">
        CUSTOMER INFORMATION
      </h1>
      <CustomerInformationForm />
      <h2 className="text-black text-lg font-semibold mb-2">
        Warranty Duration:
      </h2>
      <ul className="list-disc pl-6">
        {warrantyDuration?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
      <h2 className="text-black text-lg font-semibold mb-2">
        Notification of Issues:
      </h2>
      <ul className="list-disc pl-6">
        {notificationOfIssuance?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
      <h2 className="text-black text-lg font-semibold mb-2">
        Exclusions to Coverage:
      </h2>
      <ul className="list-disc pl-6">
        {damageData?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
      <h2 className="text-black text-lg font-semibold mb-2">
        Limitations of Liability:
      </h2>
      <ul className="list-disc pl-6">
        {limitationsOfLiability?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
      <h2 className="text-black text-lg font-semibold mb-2">
        Owner’s Responsibilities:
      </h2>
      <ul className="list-disc pl-6">
        {maintenanceData?.map((items) => (
          <li key={items?.id} className="mb-2">
            {items?.text}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default WarrantyInformationPage;
