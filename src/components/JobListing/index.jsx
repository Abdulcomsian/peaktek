import { useSelector } from "react-redux";

export default function JobListing() {
  const value = useSelector((state) => state.jobs.seletedStatus);
  console.log(value);
  return (
    <div className="px-2 py-5">
      <h1 className="font-extrabold text-xl translate-x-2 text-[#2a95c5] mb-5">
        {value?.name}
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 px-5">
        <div className="bg-stone-200 rounded-2xl p-3 space-y-4">
          <p className="border-b-2 border-stone-300 px-3 text-stone-900 font-medium">
            {value?.name}
          </p>
          <div className="space-y-4 bg-stone-100 p-3 rounded-2xl">
            <div className="space-y-2">
              <p className="text-sm">Alex Baldwin</p>
              <p className="text-stone-700">1200 Boardway Nashville, TN 3730</p>
            </div>
            <p className="text-stone-500 text-sm space-x-2">
              <span>Date Added:</span>
              <span>08/30/2024</span>
            </p>
          </div>
        </div>
        <div className="bg-stone-200 rounded-2xl p-3 space-y-4">
          <p className="border-b-2 border-stone-300 px-3 text-stone-900 font-medium">
            {value?.name}
          </p>
          <div className="space-y-4 bg-stone-100 p-3 rounded-2xl">
            <div className="space-y-2">
              <p className="text-sm">Alex Baldwin</p>
              <p className="text-stone-700">1200 Boardway Nashville, TN 3730</p>
            </div>
            <p className="text-stone-500 text-sm space-x-2">
              <span>Date Added:</span>
              <span>08/30/2024</span>
            </p>
          </div>
        </div>
        <div className="bg-stone-200 rounded-2xl p-3 space-y-4">
          <p className="border-b-2 border-stone-300 px-3 text-stone-900 font-medium">
            {value?.name}
          </p>
          <div className="space-y-4 bg-stone-100 p-3 rounded-2xl">
            <div className="space-y-2">
              <p className="text-sm">Alex Baldwin</p>
              <p className="text-stone-700">1200 Boardway Nashville, TN 3730</p>
            </div>
            <p className="text-stone-500 text-sm space-x-2">
              <span>Date Added:</span>
              <span>08/30/2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
