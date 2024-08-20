import { useState } from "react";

import { FaRegEdit } from "react-icons/fa";

import { ItemsList } from "@components/Forms";
import { Input, InputContainer, Button, Card, Textarea } from "@components";
import { useForm } from "react-hook-form";
import { createAuthorization } from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";

export default function AuthorizationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm();
  const [sections, setSections] = useState([{ title: "", section_total: 0 }]);
  const { id: jobId } = useParams();

  const handleAddSection = function () {
    const objectToAdd = Object.assign({}, sections.at(0));
    setSections((section) => [...section, objectToAdd]);
  };

  const onSubmit = async function (data) {
    console.log(data);
    const resp = await createAuthorization(data, jobId);
    console.log(resp);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-semibold text-black text-base mb-2">Disclaimer</h2>
      <p className="text-gray-400 text-sm mb-4">
        For example, the terms of an estimate, or a direction to the insurer.
      </p>
      <p className="text-sm mb-4">
        I hereby irrevocably direct my Insurer to include the name ____________
        (Roofing Co.) as the payee on any check or draft issued in payment of
        said insurance claim with regard to the building or contents repair and
        to send that check directly to the contractor. I am responsible for
        payment of the deductible in the amount of $_____, and any depreciation
        (if applicable).
      </p>

      <div className="border-b-1">
        {sections.map((section, index) => (
          <>
            <Input
              register={register}
              name={`sections[${index}].title`}
              applyMarginBottom={true}
              label="Section title"
              placeholder=""
              type="text"
              className="focus:outline-1 focus:outline-blue-600 "
            />
            <ItemsList
              register={register}
              sectionIndex={index}
              getValues={getValues}
              watch={watch}
              setValue={setValue} // Pass setValue to ItemsList
            />
          </>
        ))}
      </div>
      <Button variant="gradient" className="mt-4" onClick={handleAddSection}>
        Add Section
      </Button>
      <h2 className="flex items-center font-semibold text-black text-base mb-2 gap-3 mt-4">
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
        {Array.from({ length: 3 }, (_, i) => (
          <InputContainer className="flex justify-between mb-4">
            <Input
              placeholder="Ex. Shingle, color etc"
              type="text"
              className="mr-4 focus:outline-1 focus:outline-blue-600"
              register={register}
              name={`item${i + 1}`}
              id={`item${i + 1}`}
              required={true}
            />
            <Input
              placeholder="Can be left blank"
              type="text"
              className="focus:outline-1 focus:outline-blue-600"
              register={register}
              name={`selection${i + 1}`}
              id={`selection${i + 1}`}
              required={false}
            />
          </InputContainer>
        ))}
      </div>

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
          name="signer_first_name"
          register={register}
        />
        <Input
          id="lastName"
          applyMarginBottom={true}
          label="Last Name"
          placeholder="Doe"
          type="text"
          className="md:mr-4 focus:outline-1 focus:outline-blue-600"
          name="signer_last_name"
          register={register}
        />
        <Input
          id="email"
          applyMarginBottom={true}
          label="Email"
          placeholder="example@gmail.com"
          type="email"
          className="focus:outline-1 focus:outline-blue-600"
          name="signer_email"
          register={register}
        />
      </InputContainer>
      {/* <Button variant="gradient">Add signer</Button> */}
      <Textarea
        id="footer"
        label="Footer notes"
        className="mb-4 mt-4"
        name="footer_notes"
        register={register}
      />
      <Button variant="gradient" type="submit">
        Save as Template
      </Button>
    </form>
  );
}
