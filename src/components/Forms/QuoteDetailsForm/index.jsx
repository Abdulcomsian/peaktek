import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@components";
import { Input, TextareaInput } from "@components/FormControls";
import { FaTrashAlt } from "react-icons/fa";
import { Switch } from "antd";
import { ItemsList } from "@components/Forms";
import { useForm } from "react-hook-form";
import {
  createQuoteDetail,
  deleteQuoteItem,
  deleteQuoteSection,
  getQuoteDetail,
} from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { clientBaseURL } from "@services/config";
import { number } from "yup";

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
  } = useForm({
    defaultValues: async function () {
      const resp = await getQuoteDetail(jobId);
      console.log(resp);
      if (resp.status >= 200 && resp.status < 300) {
        console.log("fasq123", resp.data.data.sections);
        setSections((sections) => [...resp.data.data.sections]);
        return resp.data.data;
      }
    },
  });

  // Watch section totals and profit margin
  const sectionTotals = sections.map((_, index) =>
    watch(`sections[${index}].section_total`, 0)
  );
  const profitMargin = watch("profit_margin", 0);

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

  const handleSwitchChange = async (checked, quote_id, section_id) => {
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("quote_id", quote_id);
    formdata.append("section_id", section_id);
    formdata.append("status", Number(checked));
    try {
      const resp = await clientBaseURL.post(
        `/api/section/update-status/${jobId}`,
        formdata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSection = () => {
    setSections([...sections, { id: uuidv4(), title: "" }]);
  };

  const handleDeleteSection = async (id) => {
    async function deleteRemoteSection() {
      const resp = await deleteQuoteSection(jobId, id);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        setSections(sections.filter((section) => section.id !== id));
      }
    }

    if (typeof id === "number") deleteRemoteSection();
    if (typeof id !== "number")
      setSections(sections.filter((section) => section.id !== id));
  };

  const handleDeleteItem = async (section_id, item_id) => {
    console.log(sections);
    const resp = await deleteQuoteItem(jobId, section_id, item_id);
    // console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
      setSections(resp.data.data.sections);
    }
  };

  const onSubmit = async function (data) {
    console.log(data, "FINAL DATA TO LOAD");
    try {
      const resp = await createQuoteDetail(data, jobId);
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
              <Button
                variant="deleteBtn"
                onClick={() => handleDeleteSection(section.id)}
              >
                <FaTrashAlt className="text-red-600 cursor-pointer" />
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
            <Switch
              className="mt-9"
              defaultChecked={section.status === "1"}
              onChange={(checked) =>
                handleSwitchChange(checked, section.quote_id, section.id)
              }
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
