import React, { Fragment, useEffect, useState } from "react";
import { Ckeditor, Card, Button } from "@components";
import { FormHeader } from "@components/Forms";
import { useParams } from "react-router-dom";
import { createIntroduction, getProjectIntroApi } from "@services/apiProject";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { ErrorMessage } from "@components/index";
import CenteredSpinner from "@components/CenteredSpinner";

const Introduction = () => {
  const { id: jobId } = useParams();
  const [receivedData, setReceivedData] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [isLoadingPreFetch, setIsLoadingPreFetch] = useState(false);

  const handleDataChange = (data) => {
    setReceivedData(data);
  };

  useEffect(
    function () {
      async function getProjectDesignIntro() {
        setIsLoadingPreFetch(true);
        try {
          const resp = await getProjectIntroApi(jobId);
          if (resp.status === 200) {
            setIsEditting(true);
            setInitialData(resp.data?.introduction || "");
          }
        } finally {
          setIsLoadingPreFetch(false);
        }
      }

      if (jobId) getProjectDesignIntro();
    },

    [jobId]
  );

  const handleClick = async () => {
    console.log("Received data from editor:", receivedData);
    // Perform any action with receivedData
    try {
      setIsLoading(true);
      const resp = await createIntroduction(receivedData, jobId);
      console.log(resp);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.message);
        setInitialData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <FormHeader className="" btnText="View Page" pageTitle="Introduction" />
      {isLoadingPreFetch ? (
        <CenteredSpinner />
      ) : (
        <Card className="px-8 py-6 mb-4">
          <Ckeditor
            className="mb-4"
            onDataChange={handleDataChange}
            initialData={initialData}
          />
          <Button
            onClick={handleClick}
            className="px-3 py-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300"
          >
            {isLoading ? "Loading..." : "Save as Template"}
          </Button>
        </Card>
      )}
    </Fragment>
  );
};

export default Introduction;
