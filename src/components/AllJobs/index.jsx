import { FaPlus } from "react-icons/fa6";

import { Button, Card, NumJob } from "@components/UI";
import { NewJobModal } from "@components/Modals";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobswithCount } from "@services/apiJobs";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { seletectedStatus } from "@store/slices/JobsSlice";
import { useAuth } from "@context/AuthContext";
import BuildConfirmation from "./components/form";
import AddNewJob from "@components/AddNewJob";
import JobCard from "@components/JobCard";

export default function AllJobs() {
  const [invalidatePage, setInvalidatePage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const preliminaryPhases = jobs.filter((job) => job.id <= 8);
  const inBuildProcessJobs = jobs.filter((job) => job.id >= 9 && job.id <= 11);
  const finalStage = jobs.filter((job) => job.id >= 12 && job.id <= 14);
  const completedProjects = jobs.filter((job) => job.id >= 15);

  useEffect(() => {
    async function getJobsWithCounts() {
      setIsLoading(true);
      const resp = await getJobswithCount();
      try {
        if (resp.status >= 200 && resp.status < 300) {
          const jobs = resp.data.data;
          setJobs(jobs);
        }
        if (resp.status === 401) {
          logout();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getJobsWithCounts();
  }, [invalidatePage]);

  if (isLoading)
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#18faf8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="flex item-center justify-center"
      />
    );

  return (
    <>
      <div className="flex items-center justify-between mb-5 max-w-screen-xl">
        <h2 className="font-black text-3xl">Jobs</h2>
        <AddNewJob onJobAdded={setInvalidatePage} />
      </div>
      <Card className="px-5 py-4 max-w-screen-xl space-y-8">
        <JobsSection header="Preliminary Phase" jobs={preliminaryPhases} />
        <JobsSection header="In Build Progress" jobs={inBuildProcessJobs} />
        <JobsSection header="Final Stage" jobs={finalStage} />
        <JobsSection header="Completed Projects" jobs={completedProjects} />
      </Card>
    </>
  );
}

function JobsSection({ header, jobs }) {
  const disaptch = useDispatch();
  const navigate = useNavigate();

  const handleClick = function (job) {
    console.log("CLICKED", job);
    disaptch(seletectedStatus(job));
    navigate(`/jobs/${job.id}`);
  };
  return (
    <div>
      <h2 className="col-span-full text-lg font-semibold tracking-wide mb-2">
        {header}
      </h2>
      <div className="flex items-stretch justify-start flex-wrap gap-6">
        {jobs.map((job) => (
          <>
            <JobCard
              onClick={() => handleClick(job)}
              label={job.name}
              number={job.jobs_count}
              className="cursor-pointer"
            />
          </>
        ))}
      </div>
    </div>
  );
}
