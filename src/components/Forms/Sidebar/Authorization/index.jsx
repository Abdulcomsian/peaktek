import React, { useState } from "react";
import { Input, InputContainer, Button, Card, Textarea } from "@components";
import { FormHeader, AuthList } from "@components/Forms";
import { FaRegEdit } from "react-icons/fa";

const Authorization = () => {
  const [disclaimer, setDisclaimer] = useState(
    "I hereby irrevocably direct my Insurer to include the name ____________ (Roofing Co.) as the payee on any check or draft issued in payment of said insurance claim with regard to the building or contents repair and to send that check directly to the contractor. I am responsible for payment of the deductible in the amount of $_____, and any depreciation (if applicable)."
  );
  return (
    <div>
      <FormHeader className="" btnText="View Page" pageTitle="Authorization" />
      <Card className="px-8 py-6 mb-4">
        <h2 className="font-semibold text-black text-base mb-2">Disclaimer</h2>
        <p className="text-gray-400 text-sm mb-4">
          For example, the terms of an estimate, or a direction to the insurer.
        </p>

        <Input
          value={disclaimer}
          placeholder=""
          type="text"
          className="focus:outline-1 focus:outline-blue-600"
          onChange={(e) => setDisclaimer(e.target.value)}
        />
      </Card>
      <Card className="px-8 py-6 mb-4">
        <Input
          applyMarginBottom={true}
          label="Section title"
          placeholder=""
          type="text"
          className="focus:outline-1 focus:outline-blue-600 mb-8"
        />
        <AuthList />
      </Card>
      <Card className="px-8 py-6 mb-4">
        <h2 className="flex items-center font-semibold text-black text-base mb-2 gap-3">
          Insurance Details <FaRegEdit />
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Use this section to request project or product details on your
          authorization page.
        </p>
        <div>
          <div className="flex  justify-between  mb-4">
            <span className="block w-full font-semibold mr-4">Item</span>
            <span className="block w-full font-semibold">Selection</span>
          </div>
          <InputContainer className="flex justify-between mb-4">
            <Input
              placeholder="Ex. Shingle, color etc"
              type="text"
              className="mr-4 focus:outline-1 focus:outline-blue-600"
            />
            <Input
              placeholder="Can be left blank"
              type="text"
              className="focus:outline-1 focus:outline-blue-600"
            />
          </InputContainer>
          <InputContainer className="flex justify-between mb-4">
            <Input
              placeholder="Ex. Insurance Policy color etc"
              type="text"
              className="mr-4 focus:outline-1 focus:outline-blue-600"
            />
            <Input
              placeholder="Can be left blank"
              type="text"
              className="focus:outline-1 focus:outline-blue-600"
            />
          </InputContainer>
          <InputContainer className="flex  justify-between mb-4">
            <Input
              placeholder="Ex. Shingle, color etc"
              type="text"
              className="mr-4 focus:outline-1 focus:outline-blue-600"
            />
            <Input
              placeholder="Can be left blank"
              type="text"
              className="focus:outline-1 focus:outline-blue-600"
            />
          </InputContainer>
        </div>
      </Card>
      <Card className="px-8 py-6 mb-4">
        <h2 className="flex items-center font-semibold text-black text-base mb-2 gap-3">
          Primary signer
        </h2>
        <InputContainer className="flex flex-col md:flex-row  justify-between mb-8">
          <Input
            id="firstName"
            applyMarginBottom={true}
            label="First Name"
            placeholder="Jhon"
            type="text"
            className="md:mr-4 focus:outline-1 focus:outline-blue-600"
          />
          <Input
            id="lastName"
            applyMarginBottom={true}
            label="Last Name"
            placeholder="Doe"
            type="text"
            className="md:mr-4 focus:outline-1 focus:outline-blue-600"
          />
          <Input
            id="email"
            applyMarginBottom={true}
            label="Email"
            placeholder="example@gmail.com"
            type="text"
            className="focus:outline-1 focus:outline-blue-600"
          />
        </InputContainer>
        <Button className="px-3 py-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300">
          Add signer
        </Button>
      </Card>
      <Card className="px-8 py-6 mb-4">
        <Textarea id="footer" label="Footer notes" className="mb-4" />
        <Button className="p-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300">
          Save as Template
        </Button>
      </Card>
    </div>
  );
};

export default Authorization;
