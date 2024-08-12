import React, { useState, Fragment } from "react";
import { Input, Button, Card } from "@components";
import { FormHeader, ItemsList } from "@components/Forms";
import { Switch } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@components/FormControls";

const QuoteDetails = () => {
  const [sections, setSections] = useState([{ id: uuidv4(), title: "" }]);
  const [progress, setProgress] = useState(30);

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

  return (
    <Fragment>
      <FormHeader
        className=""
        btnText="View Page"
        pageTitle="Insurance Approved"
      />

      <Card className="p-4 md:px-8 md:py-6 mb-4">
        {sections.map((section, index) => (
          <section key={section.id} className="border-b border-gray-300 py-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center pt-4 w-full mr-2 md:mr-4">
                <Input
                  id={`sectionTitle-${section.id}`}
                  applyMarginBottom={true}
                  label="Section title"
                  placeholder=""
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleTitleChange(section.id, e.target.value)
                  }
                  className="focus:outline-1  md:max-w-md focus:outline-blue-600 mr-2 md:mr-4"
                />
                <FaTrashAlt
                  className="text-red-600 mt-6  cursor-pointer"
                  onClick={() => handleDeleteSection(section.id)}
                />
              </div>
              <Switch className="mt-9" onClick={handleSwitchClick} />
            </div>
            <ItemsList />
          </section>
        ))}
        <div className="py-8  border-b border-gray-300">
          <Button
            onClick={handleAddSection}
            className="p-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300"
          >
            Add Section
          </Button>
        </div>
        <div className="py-8 border-b border-gray-300 mb-4">
          <h2 className="text-xl mb-4">Profit margin for this quote</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-1/2 flex items-center mr-4 mb-4 md:mb-0">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mr-2"
              />
              <input
                type="number"
                value={progress}
                onChange={handleProgressChange}
                className="w-20 border border-gray-300 rounded p-2"
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex justify-between pb-2 border-b border-gray-300">
                <span>Quote subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 border-b border-gray-300 mb-4">
          <Textarea
            label="Notes"
            className="max-w-lg"
            applyMarginBottom="true"
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default QuoteDetails;
