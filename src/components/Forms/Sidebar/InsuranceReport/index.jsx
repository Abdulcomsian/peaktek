import React, { Fragment, useState } from "react";
import { Card } from "@components";
import { FormHeader } from "@components/Forms";
import { Switch, Radio } from "antd";
import { MyPdfs, SharedPdf, SingleUsePdf, TextPage } from "@components/Payment";

const InsuranceReport = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleSwitchClick = (e) => {
    console.log("Switch toggled", e);
    e.stopPropagation();
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const initialEditorData = `PLEASE READ THE AGREED UPON PAYMENT TERMS AND SCHEDULE
  `;
  const radioOptions = [
    { value: 1, label: "My PDFs" },
    { value: 2, label: "Shared PDFs" },
    { value: 3, label: "Single Use PDFs" },
    { value: 4, label: "Text Page" },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case 1:
        return <MyPdfs />;
      case 2:
        return <SharedPdf />;
      case 3:
        return <SingleUsePdf />;
      case 4:
        return <TextPage initialEditorData={initialEditorData} />;
      default:
        return "Select an option to see content";
    }
  };

  return (
    <Fragment>
      <FormHeader
        className=""
        btnText="View Page"
        pageTitle="Xactimate Report from Insurance"
      />
      <Card className="px-8 py-6 flex justify-between mb-4">
        <div>
          <h2 className="font-semibold text-black text-base mb-2">
            Require customers to acknowledge this page
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            They will be asked during the signing process
          </p>
        </div>
        <Switch className="ml-4" onClick={handleSwitchClick} />
      </Card>
      <Card className="px-8 py-6 mb-4">
        <Radio.Group
          onChange={handleRadioChange}
          value={selectedOption}
          className="flex flex-col"
        >
          {radioOptions.map((option) => (
            <Radio key={option.value} value={option.value} className="mb-2">
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Card>
      <Card className="px-8 py-6 mb-4">{renderContent()}</Card>
    </Fragment>
  );
};

export default InsuranceReport;
