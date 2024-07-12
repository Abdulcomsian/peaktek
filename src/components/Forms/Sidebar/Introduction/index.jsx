import React, { Fragment, useState } from "react";
import { Ckeditor, Card, Button } from "@components";
import { FormHeader } from "@components/Forms";
import { useParams } from "react-router-dom";
import { createIntroduction } from "@services/apiProject";
const Introduction = () => {
  const { id: jobId } = useParams();
  const [receivedData, setReceivedData] = useState("");

  const handleDataChange = (data) => {
    setReceivedData(data);
  };

  const handleClick = async () => {
    console.log("Received data from editor:", receivedData);
    // Perform any action with receivedData
    const resp = await createIntroduction(receivedData, jobId);
    console.log(resp);
  };
  return (
    <Fragment>
      <FormHeader className="" btnText="View Page" pageTitle="Introduction" />
      <Card className="px-8 py-6 mb-4">
        <Ckeditor className="mb-4" onEditor={handleDataChange} />
        <Button
          onClick={handleClick}
          className="px-3 py-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300"
        >
          Save as Template
        </Button>
      </Card>
    </Fragment>
  );
};

export default Introduction;
