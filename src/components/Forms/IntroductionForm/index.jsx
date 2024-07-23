import { Ckeditor } from "@components/FormControls";
import { useState } from "react";

export default function IntroductionForm() {
  const [initialData, setInitialData] = useState(null);
  const [receivedData, setReceivedData] = useState("");
  const handleDataChange = (data) => {
    setReceivedData(data);
  };

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
      if (resp.status === 500) toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Ckeditor
        className="mb-4"
        onDataChange={handleDataChange}
        initialData={initialData}
      />
    </>
  );
}
