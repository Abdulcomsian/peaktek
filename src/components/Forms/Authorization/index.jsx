import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

import { ItemsList } from "@components/Forms";
import { InputContainer, Button, Card, Textarea } from "@components";
import { useForm } from "react-hook-form";
import {
  createAuthorization,
  deleteAuthorizationItem,
  deleteAuthorizationSection,
  getAuthorization,
} from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";
import { Input, TextareaInput } from "@components/FormControls";
import toast from "react-hot-toast";
import { Loader } from "@components/UI";

export default function AuthorizationForm() {
  const { id: jobId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState([
    { id: uuidv4(), title: "", section_total: 0 },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm({
    defaultValues: async function () {
      try {
        const resp = await getAuthorization(jobId);
        if (resp.status >= 200 && resp.status < 300) {
          setSections(resp.data.data.sections);
          return resp.data.data;
        }
      } catch (error) {}
    },
  });

  const handleAddSection = () => {
    setSections([...sections, { id: uuidv4(), title: "" }]);
  };

  const handleDeleteItem = (section_id, item_id) => {
    async function deleteItemRemote() {
      const resp = await deleteAuthorizationItem(jobId, section_id, item_id);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        setSections(resp.data.data.sections);
      }
    }

    if (typeof item_id === "number") deleteItemRemote();
    if (typeof item_id !== "number")
      setSections(sections.filter((section) => section.id !== id));
  };

  const handleDeleteSection = async (section_id) => {
    async function deleteRemoteSection() {
      const resp = await deleteAuthorizationSection(jobId, section_id);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        setSections(resp.data.data.sections);
      }
    }

    if (typeof section_id === "number") deleteRemoteSection();
    if (typeof section_id !== "number") {
      setSections((sections) =>
        sections.filter((section) => section.id !== section_id)
      );
    }
  };

  const onSubmit = async function (data) {
    setIsLoading(true);
    try {
      const resp = await createAuthorization(data, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-semibold text-black text-base mb-2">Disclaimer</h2>
      <p className="text-gray-400 text-sm mb-4">
        For example, the terms of an estimate, or a direction to the insurer.
      </p>
      <div>
        <p className="text-sm mb-4 inline-block">
          I hereby irrevocably direct my Insurer to include the name
        </p>
        <Input
          className="inline-block !w-fit mx-1"
          register={register}
          name="disclaimer"
        />
        <p className="inline">
          (Roofing Co.) as the payee on any check or draft issued in payment of
          said insurance claim with regard to the building or contents repair
          and to send that check directly to the contractor. I am responsible
          for payment of the deductible in the amount of $
        </p>
        {/* <Input className="inline-block !w-fit mx-1" register={register} name=""/> */}
        <p className="inline">, and any depreciation (if applicable).</p>
      </div>

      <div className="border-b-1">
        {sections.map((section, index) => (
          <>
            <div className="flex gap-3 items-center" key={section.id}>
              <Button
                variant="deleteBtn"
                onClick={() => handleDeleteSection(section.id)}
              >
                <FaTrashAlt className="text-red-600 cursor-pointer" />
              </Button>
              <Input
                register={register}
                name={`sections[${index}].title`}
                applyMarginBottom={true}
                label="Section title"
                placeholder=""
                type="text"
                className="focus:outline-1 focus:outline-blue-600 "
              />
            </div>
            <ItemsList
              register={register}
              sectionIndex={index}
              watch={watch}
              setValue={setValue} // Pass setValue to ItemsList
              defaultItem={section.items}
              onDeleteItem={handleDeleteItem}
              section={section}
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
          <InputContainer className="flex justify-between mb-4" key={i}>
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
              name={`section${i + 1}`}
              id={`section${i + 1}`}
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
      <TextareaInput
        id="footer_notes"
        label="Footer notes"
        className="mb-4 mt-4"
        register={register}
        name="footer_notes"
      />
      <Button variant="gradient" className="mt-4" type="submit">
        {isLoading ? (
          <Loader width={"24px"} height={"24px"} color="#fff" />
        ) : (
          "Save as Template"
        )}
      </Button>
    </form>
  );
}
