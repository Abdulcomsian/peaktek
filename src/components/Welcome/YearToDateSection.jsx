import { Card } from "..";

export default function YearToDateSection() {
  return (
    <Card className="order-2 md:row-start-3 md:col-start-2 h-56 space-y-5">
      <h2 className="text-lg font-semibold mb-4 text-[#20b6d5] tracking-tight">
        Year To Date
      </h2>
      <div>
        <p className="text-xl font-semibold">$00,000.00</p>
        <p className="text-xs text-stone-900">Total Revenue Generated</p>
      </div>
      <div>
        <p className="text-xl font-semibold">$--</p>
        <p className="text-xs text-stone-900">Number of Won & Closed Deals</p>
      </div>
    </Card>
  );
}
