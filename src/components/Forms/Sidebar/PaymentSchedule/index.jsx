import React, { useState } from "react";
import { Card } from "@components";
import { FormHeader, PaymentScheduleForm } from "@components/Forms";
import { Radio } from "antd";

import PdfOptions from "./PdfOptions";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@components/UI";

const initialEditorData = `PLEASE READ THE AGREED UPON PAYMENT TERMS AND SCHEDULE
  `;

const PaymentSchedule = () => {
  return (
    <div>
      <FormHeader
        className=""
        btnText="View Page"
        pageTitle="Payment Schedule"
      />
      <Card className="flex flex-col">
        <PaymentScheduleForm />
      </Card>
    </div>
  );
};

export default PaymentSchedule;
