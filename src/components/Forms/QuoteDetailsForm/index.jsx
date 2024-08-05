import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Card } from "@components";
import { Input } from "@components/FormControls";
import { FaTrashAlt } from "react-icons/fa";
import { Switch } from "antd";
import { FormHeader, ItemsList } from "@components/Forms";
import { Textarea } from "@components/FormControls";
import { useForm } from "react-hook-form";

export default function QuoteDetailsForm() {
  const [sections, setSections] = useState([{ id: uuidv4(), title: "" }]);
  const [progress, setProgress] = useState(30);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSwitchClick = (e) => {
    console.log("Switch toggled", e);
    e.stopPropagation();
  };

  const handleAddSection = () => {
    setSections([...sections, { id: uuidv4(), title: "" }]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleTitleChange = (id, value) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, title: value } : section
      )
    );
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };
  const onSubmit = function (data) {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {sections.map((section, index) => (
        <section
          key={section.id}
          className="border-b border-gray-150 py-8 pt-0"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-end gap-5 pt-4 w-full mr-2 md:mr-4">
              <Button variant="deleteBtn">
                <FaTrashAlt
                  className="text-red-600  cursor-pointer"
                  onClick={() => handleDeleteSection(section.id)}
                />
              </Button>
              <Input
                id={`sectionTitle-${section.id}`}
                applyMarginBottom={true}
                label="Section title"
                placeholder=""
                type="text"
                name={`section_title_${index}`}
                register={register}
                className="focus:outline-1  md:max-w-md focus:outline-blue-600 mr-2 md:mr-4"
              />
            </div>
            <Switch className="mt-9" onClick={handleSwitchClick} />
          </div>
          <ItemsList register={register} />
        </section>
      ))}
      <div className="py-5  border-b border-gray-150">
        <Button variant="gradient" onClick={handleAddSection}>
          Add Section
        </Button>
      </div>
      <div className="flex items-center gap-8  py-8 border-b border-gray-150 mb-4">
        <div className="grow flex flex-col gap-7 ">
          <div className="flex items-center justify-between">
            <h2 className="text-base">Profit margin for this quote</h2>
            <span>{progress}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            {...register("profit_margin")}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        <Input
          label="Quote subtotal"
          applyMarginBottom={true}
          type="number"
          name="item"
          placeholder="$6.5"
          className="grow w-fit"
          register={register}
        />
        <Input
          label="Total"
          applyMarginBottom={true}
          type="number"
          name="item"
          placeholder="$6.5"
          className="grow w-fit"
          register={register}
        />
      </div>
      <div className="py-4">
        <Textarea
          label="Note"
          placeholder="Type here"
          className="max-w-lg"
          applyMarginBottom="true"
        />
      </div>
      <Button variant="gradient" type="submit">
        Save Quote
      </Button>
    </form>
  );
}
