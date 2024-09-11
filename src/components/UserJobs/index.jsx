import { getUserJobs } from "@services/apiJobs";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import LinkButton from "@components/UI/LinkButton";

export default function UserJobs() {
  const [userJobs, setUserJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  useEffect(() => {
    async function fetchUserJobs() {
      const dataToLoad = {
        type: type,
        box: status,
      };

      setIsLoading(true);
      const resp = await getUserJobs(dataToLoad);
      if (resp.status >= 200 && resp.status < 300) {
        setUserJobs(resp.data.data);
      }
      setIsLoading(false);
    }
    fetchUserJobs();
  }, [type, status]);

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

  if (userJobs.length === 0)
    return (
      <p className="text-stone-500 text-sm text-center mt-8">
        👋 Jobs are not yet created for this status,{" "}
        <LinkButton className="!text-sm" to="/jobs">
          Create new Job?
        </LinkButton>
      </p>
    );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 px-5 mt-5">
      {userJobs.map((job) => (
        <div className="bg-stone-200 rounded-2xl p-3 space-y-4">
          <p className="border-b-2 border-stone-300 px-3 mb-3 text-stone-900 font-medium">
            {job.name}
          </p>
          <Link to={`/job-details/${job.id}`}>
            <div className="space-y-4 bg-white p-3 rounded-2xl">
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
  );
}
