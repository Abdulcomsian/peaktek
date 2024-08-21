import React from "react";
import { Card } from "@components";
import { FormHeader, TermandConditionForm } from "@components/Forms";
import { Switch } from "antd";

const TermsAndConditions = () => {
  const handleSwitchClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <FormHeader
        className=""
        btnText="View Page"
        pageTitle="Terms and Conditions"
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
        <TermandConditionForm />
      </Card>
    </div>
  );
};

export default TermsAndConditions;
