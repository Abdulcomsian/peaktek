import { Ckeditor } from "@components/FormControls";
import { Button } from "@components/UI";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function IntroductionForm() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [receivedData, setReceivedData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleDataChange = (data) => {
    console.log("DATA", data);
    setReceivedData(data);
  };

  const handleClick = async (e) => {
    const token = localStorage.getItem("token");
    console.log("Received data from editor:", receivedData);

    const formdata = new FormData();
    formdata.append("introduction", receivedData);
    try {
      setIsLoading(true);
      const resp = await clientBaseURL.post(
        `${clientEndPoints.createIntroduction}/${id}`,
        formdata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (resp.status >= 200 && resp.status < 300) {
        console.log("SUCESS");
        toast.success(resp.data.message);
        setInitialData(null);
      }
      if (resp.status === 500) toast.error("Something went wrong.");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Ckeditor
        className="mb-4"
        onChange={handleDataChange}
        initialData={initialData}
      />
      <Button variant="gradient" onClick={handleClick}>
        Save
      </Button>
    </>
  );
}
