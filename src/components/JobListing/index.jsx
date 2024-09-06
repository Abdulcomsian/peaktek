import { getAllStatusJobs } from "@services/apiJobs";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

export default function JobListing() {
  const [statusJobs, setStatusJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const { jobId } = useParams();

  console.log("Status jobs", statusJobs);

  useEffect(() => {
    async function fetchAllStatusJobs() {
      setIsLoadingJobs(true);
      const jobs = await getAllStatusJobs(jobId);
      setIsLoadingJobs(false);

      setStatusJobs(jobs);
    }
    fetchAllStatusJobs();
  }, []);

  if (isLoadingJobs)
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
    <div className="px-2 py-5">
      <h1 className="font-extrabold text-xl translate-x-2 text-[#2a95c5] mb-5">
        {statusJobs.name}
      </h1>
      {statusJobs?.jobs?.length === 0 && (
        <p className="text-center text-sm text-stone-500">
          👋 There are no jobs yet created for {statusJobs.name}
        </p>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 px-5">
        {statusJobs?.jobs?.map((job) => (
          <div className="bg-stone-200 rounded-2xl p-3 space-y-4">
            <p className="border-b-2 border-stone-300 px-3 mb-3 text-stone-900 font-medium">
              {statusJobs.name}
            </p>
            <Link to={`/job-details/${job.id}`}>
              <div className="space-y-4 bg-stone-100 p-3 rounded-2xl">
                <div className="space-y-2">
                  <p className="text-sm">{job.name}</p>
                  <p className="text-stone-700">{job.address}</p>
                </div>
                <p className="text-stone-500 text-sm space-x-2">
                  <span>Date Added:</span>
                  <span>{new Date(job.created_at).toLocaleDateString()}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
