import { getAllStatusJobs } from "@services/apiJobs";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { Card } from "..";
import { dateDifference, formatCurrency } from "../../utils/helper";
import { ColoredCirleByDays } from "@components/UI";
import AddNewJob from "@components/AddNewJob";

export default function JobListing() {
  const [invalidatePage, setInvalidatePage] = useState(false);
  const [statusJobs, setStatusJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const { jobId } = useParams();

  console.log("STATAUS JOBSSS", statusJobs);

  const { updated_at, created_at } = statusJobs;

  const x = dateDifference(updated_at || created_at);

  useEffect(() => {
    async function fetchAllStatusJobs() {
      setIsLoadingJobs(true);
      const jobs = await getAllStatusJobs(jobId);
      setIsLoadingJobs(false);
      setStatusJobs(jobs);
    }
    fetchAllStatusJobs();
  }, [invalidatePage]);

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
    <div className="px-8 min-h-full">
      <div className="flex items-center justify-between mb-5 max-w-screen-xl">
        <h2 className="font-black text-3xl">Jobs</h2>
        <AddNewJob onJobAdded={setInvalidatePage} />
      </div>
      <Card className="min-h-full">
        <h1 className="font-extrabold text-xl translate-x-2 text-[#2a95c5] mb-5">
          {statusJobs.name}
        </h1>
        {statusJobs?.jobs?.length === 0 && (
          <p className="text-center text-sm text-stone-500">
            👋 There are no jobs yet created for {statusJobs.name}
          </p>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 ">
          {statusJobs?.jobs?.map((job) => (
            <div className="bg-stone-200 rounded-2xl p-3 space-y-4">
              <div className=" px-3 py-1 mb-3 border-b border-stone-700 flex items-center justify-between">
                <p className="text-base font-medium ">{job.name}</p>
                <p className="text-base font-light">
                  {formatCurrency(job.amount ? job.amount : 0)}
                </p>
              </div>
              <Link to={`/job-details/${job.id}`}>
                <div className="space-y-2 bg-stone-100 p-3 rounded-2xl">
                  <div className="space-y-2 border-b border-stone-700 pb-3">
                    <p className="text-stone-800 font-light">{job.address}</p>
                  </div>

                  {dateDifference(job.updated_at || job.created_at) === 0 && (
                    <p className="text-xs font-light flex items-center gap-2 ">
                      <ColoredCirleByDays days={0} />
                      <span>New to Stage</span>
                    </p>
                  )}

                  {dateDifference(job.updated_at || job.created_at) > 0 && (
                    <p className="text-xs font-light flex items-center gap-2">
                      <ColoredCirleByDays
                        days={dateDifference(job.updated_at || job.created_at)}
                      />
                      <span>
                        {`${dateDifference(
                          job.updated_at || job.created_at
                        )} days`}
                      </span>
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
