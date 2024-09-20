import { formatCurrency } from "../../utils/helper";
import { Card } from "..";

export default function YearToDateSection({ totalRevenue }) {
  return (
    <Card className="order-2 md:row-start-3 md:col-start-2 h-56 space-y-5">
      <h2 className="text-lg font-semibold mb-4 text-[#20b6d5] tracking-tight">
        Year To Date
      </h2>
      <div>
        <p className="text-xl font-semibold">
          {formatCurrency(totalRevenue?.total_revenue_generated)}
        </p>
        <p className="text-xs text-stone-900">Total Revenue Generated</p>
      </div>
      <div>
        <p className="text-xl font-semibold">
          {formatCurrency(totalRevenue?.won_closed)}
        </p>
        <p className="text-xs text-stone-900">Number of Won & Closed Deals</p>
      </div>
    </Card>
  );
}
