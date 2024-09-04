export default function Welcome() {
  return (
    <div className="px-5 py-4 max-w-screen-lg grid grid-cols-3 gap-x-6">
      <div className="text-blue-100 bg-[#26bbd8] grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-semibold">Customers</p>
        <p className="text-3xl font-bold">25</p>
      </div>
      <div className="text-blue-100 bg-[#28acd1] grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-semibold">Commissions</p>
        <p className="text-3xl font-bold">$8,690.90</p>
      </div>
      <div className="text-blue-100 bg-[#5261a3] grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-semibold">Deals Won & Closed</p>
        <p className="text-3xl font-bold">$77,809.95</p>
      </div>

      <h2 className="col-span-full mt-6 text-medium text-[#26bbd8]">
        This Week...
      </h2>
      <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-medium">New Loads</p>
        <p className="text-3xl font-bold">1</p>
      </div>
      <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-medium">Won & Closed</p>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-medium">Won & Closed value</p>
        <p className="text-3xl font-bold">0</p>
      </div>

      <h2 className="col-span-full mt-6 text-medium text-[#26bbd8]">
        This Month...
      </h2>
      <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-medium">New Loads</p>
        <p className="text-3xl font-bold">1</p>
      </div>
      <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-medium">Won & Closed</p>
        <p className="text-3xl font-bold">2</p>
      </div>
      <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-medium">Won & Closed value</p>
        <p className="text-3xl font-bold">$45,776.98</p>
      </div>
    </div>
  );
}
