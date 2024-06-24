import React, { Fragment } from "react";
import { Ckeditor, Card, Button } from "@components";
import { FormHeader } from "@components/Forms";
const Introduction = () => {
  return (
    <Fragment>
      <FormHeader className="" btnText="View Page" pageTitle="Introduction" />
      <Card className="px-8 py-6 mb-4">
        <Ckeditor className="mb-4" />
        <Button className="px-3 py-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300">
          Save as Template
        </Button>
      </Card>
    </Fragment>
  );
};

export default Introduction;
