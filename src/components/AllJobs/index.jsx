import { FaPlus } from "react-icons/fa6";

import { Button, NumJob } from "@components/UI";
import { NewJobModal } from "@components/Modals";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobswithCount } from "@services/apiJobs";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { seletectedStatus } from "@store/slices/JobsSlice";
import { useAuth } from "@context/AuthContext";

export default function AllJobs() {
  const [showAddNewJobModal, setAddNewJobModal] = useState(false);
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
      <div className="px-5 py-4 max-w-screen-lg">
        <Button
          onClick={() => setAddNewJobModal(true)}
          className="float-end"
          variant="gradient"
        >
          <FaPlus className="text-white mr-1" />
          New Job
        </Button>
        <JobsSection header="Preliminary Phase" jobs={preliminaryPhases} />
        <JobsSection header="In Build Progress" jobs={inBuildProcessJobs} />
        <JobsSection header="Final Stage" jobs={finalStage} />
        <JobsSection header="Completed Projects" jobs={completedProjects} />
      </div>
      {showAddNewJobModal && (
        <NewJobModal
          open={showAddNewJobModal}
          onOk={() => setAddNewJobModal(false)}
          onCancel={() => setAddNewJobModal(false)}
          onAddJob={() => setInvalidatePage((is) => !is)}
        />
      )}
    </>
  );
}

function JobsSection({ header, jobs }) {
  const disaptch = useDispatch();
  const navigate = useNavigate();

  const handleClick = function (job) {
    console.log("CLICKED", job);
    disaptch(seletectedStatus(job));
    navigate(`/dashboard/${job.id}`);
  };
  return (
    <>
      <h2 className="mt-6 mb-2 text-medium text-[#26bbd8]">{header}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <NumJob
            onClick={() => handleClick(job)}
            title={job.name}
            number={job.jobs_count}
            varient="gray"
            className="cursor-pointer hover:shadow-sm hover:shadow-stone-400 transition-all duration-300"
          />
        ))}
      </div>
    </>
  );
}
