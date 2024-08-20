import CenteredSpinner from "@components/CenteredSpinner";
import { Ckeditor } from "@components/FormControls";
import { Button } from "@components/UI";
import { useAuth } from "@context/AuthContext";
import {
  createIntroduction,
  getIntroduction as getIntroductionApi,
} from "@services/apiDesignMeeting";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function IntroductionForm() {
  const { id: jobId } = useParams();
  const [initialData, setInitialData] = useState("");
  const [receivedData, setReceivedData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDataChange = (data) => {
    setReceivedData(data);
  };

  useEffect(function () {
    async function getIntroduction() {
      try {
        setIsLoadingInitialData(true);
        const resp = await getIntroductionApi(jobId);
        if (resp.status >= 200 && resp.status < 300) {
          setInitialData(resp.data.data.introduction);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingInitialData(false);
      }
    }

    getIntroduction();
  }, []);

  const handleClick = async (e) => {
    const formdata = new FormData();
    formdata.append("introduction", receivedData);
    try {
      setIsLoading(true);
      const resp = await createIntroduction(formdata, jobId);
      if (resp?.response?.data?.status === 401) {
        logout();
        navigate("/");
      }
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        setInitialData(null);
      }
      if (resp.status === 500) toast.error("Something went wrong.");
    } catch (err) {
      console.log("RESP ERROR", err);
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoadingInitialData) return <CenteredSpinner />
  return (
    <>
      <Ckeditor
        className={`mb-4 ${
          isLoadingInitialData ? "opacity-50 pointer-events-none" : ""
        }`}
        onChange={handleDataChange}
        value={initialData}
      />
      <Button variant="gradient" onClick={handleClick}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </>
  );
}
