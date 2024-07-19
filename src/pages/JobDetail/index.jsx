import { BreadCrumb } from "@components/UI";
import Header from "./Header";
import Tabs from "./Tabs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobApi } from "@services/apiJobs";
import { useAuth } from "@context/AuthContext";
import CenteredSpinner from "@components/CenteredSpinner";

export default function JobDetail() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetail] = useState();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isFetchingJob, setIsFetchingJob] = useState(false);

  useEffect(() => {
    async function getJob() {
      try {
        isFetchingJob(true);
        const resp = await getJobApi(jobId);
        console.log(resp);
        if (resp.status >= 200 && resp.status < 300) {
          setJobDetail(resp.job);
        }
        if (resp.status === 401) {
          logout();
          navigate("/");
        }
      } finally {
        setIsFetchingJob(false);
      }
    }
    getJob();
  }, [jobId]);

  if (isFetchingJob) return <CenteredSpinner />;
  return (
    <div className="m-4">
      <Header companyName={jobDetails?.name}>
        <BreadCrumb items={[{ title: "Dashboard" }, { title: "Leads" }]} />
      </Header>
      <Tabs />
    </div>
  );
}
