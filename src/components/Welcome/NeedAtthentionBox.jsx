import { Card } from "..";

export default function NeedAtthentionBox() {
  return (
    <Card className="bg-red-500 sm:row-span-2 p-3">
      <span className="text-lg font-semibold tracking-wide inline-block mb-5">
        Needs Attention
      </span>
      <ul className="flex flex-col gap-3">
        {Array.from({ length: 3 }, (_, i) => {
          return (
            <li>
              <AtthentionListItem key={i} />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function AtthentionListItem() {
  return (
    <div className="leading-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Customer Name</span>
        <span className="font-light text-xs">4 days ago</span>
      </div>
      <span className="text-xs text-stone-800">New Lead</span>
    </div>
  );
}
