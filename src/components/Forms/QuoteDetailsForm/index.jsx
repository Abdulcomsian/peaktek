import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@components";
import { Input, TextareaInput } from "@components/FormControls";
import { FaTrashAlt } from "react-icons/fa";
import { Switch } from "antd";
import { ItemsList } from "@components/Forms";
import { useForm } from "react-hook-form";
import { createQuoteDetail } from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function QuoteDetailsForm() {
  const { id: jobId } = useParams();
  const [sections, setSections] = useState([{ id: uuidv4(), title: "" }]);
  const [progress, setProgress] = useState(30);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  // Watch section totals and profit margin
  const sectionTotals = sections.map((_, index) =>
    watch(`sections[${index}].section_total`, 0)
  );
  const profitMargin = watch("profit_margin", 0);

  // Calculate quote_sub_total and quote_total
  useEffect(() => {
    // Calculate quote_sub_total
    const subtotal = sectionTotals
      .reduce((acc, total) => acc + parseFloat(total || 0), 0)
      .toFixed(2);

    // Update quote_sub_total only if it has changed
    setValue("quote_sub_total", subtotal, { shouldDirty: true });

    // Calculate total based on profit margin
    const total = (subtotal * (1 + profitMargin / 100)).toFixed(2);

    // Update quote_total only if it has changed
    setValue("quote_total", total, { shouldDirty: true });

    // This effect runs when sectionTotals or profitMargin change
  }, [sectionTotals.join(","), profitMargin, setValue]);

  const handleSwitchClick = (e) => {
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

  const onSubmit = async function (data) {
    console.log(data);
    try {
      const resp = await createQuoteDetail(data, jobId);
      console.log(resp);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onerror = (error) => {
    console.error(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onerror)}>
      {sections.map((section, index) => (
        <section
          key={section.id}
          className="border-b border-gray-150 py-8 pt-0"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-end gap-5 pt-4 w-full mr-2 md:mr-4">
              <Button variant="deleteBtn">
                <FaTrashAlt
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDeleteSection(section.id)}
                />
              </Button>
              <Input
                id={`sections[${index}].title`}
                applyMarginBottom={true}
                label="Section title"
                placeholder=""
                type="text"
                name={`sections[${index}].title`}
                register={register}
                className="focus:outline-1 md:max-w-md focus:outline-blue-600 mr-2 md:mr-4"
              />
            </div>
            <Switch className="mt-9" onClick={handleSwitchClick} />
          </div>
          <ItemsList
            register={register}
            sectionIndex={index}
            watch={watch}
            setValue={setValue} // Pass setValue to ItemsList
          />
        </section>
      ))}
      <div className="py-5 border-b border-gray-150">
        <Button variant="gradient" onClick={handleAddSection}>
          Add Section
        </Button>
      </div>
      <div className="flex items-center gap-8 py-8 border-b border-gray-150 mb-4">
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
          name="quote_sub_total"
          placeholder="$6.5"
          className="grow w-fit"
          register={register}
          disabled={true} // Disable input since it's auto-calculated
        />
        <Input
          label="Total"
          applyMarginBottom={true}
          type="number"
          name="quote_total"
          placeholder="$6.5"
          className="grow w-fit"
          register={register}
          disabled={true} // Disable input since it's auto-calculated
        />
      </div>
      <div className="py-4">
        <TextareaInput
          label="Note"
          placeholder="Type here"
          className="max-w-lg"
          applyMarginBottom="true"
          name="notes"
          register={register}
        />
      </div>
      <Button variant="gradient" type="submit">
        Save Quote
      </Button>
    </form>
  );
}
