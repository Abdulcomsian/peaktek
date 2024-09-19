import { differenceInDays } from "date-fns";
import { Card } from "..";
import { dateDifference } from "../../utils/helper";
import { ColoredCirleByDays } from "@components/UI";

export default function NeedAtthentionBox({ listOfAttentions = [] }) {
  const isListOfAtthentions = listOfAttentions.length > 0;
  return (
    <Card className="bg-red-500 sm:row-span-2 p-3">
      <span className="text-lg font-semibold tracking-wide inline-block mb-5">
        Needs Attention
      </span>
      {!isListOfAtthentions ? (
        <p className="text-xs text-center text-stone-700">
          👋 You Dont have any job which need attentions.
        </p>
      ) : (
        <AtthentionsList attentions={listOfAttentions} />
      )}
    </Card>
  );
}

function AtthentionsList({ attentions }) {
  console.log("Attention list", attentions);
  return (
    <ul className="flex flex-col gap-3">
      {attentions.map((item) => {
        return (
          <li>
            <AtthentionListItem key={item.id} item={item} />
          </li>
        );
      })}
    </ul>
  );
}

function AtthentionListItem({ item }) {
  const { name: customerName, status, date } = item;
  const { name: statusName } = status;
  const daysElapsedInCurrStatus = dateDifference(date);

  return (
    <div className="leading-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{customerName}</span>
        <span className="font-light text-xs inline-flex items-center gap-2">
          <ColoredCirleByDays days={daysElapsedInCurrStatus} />
          <span>{daysElapsedInCurrStatus} days ago</span>
        </span>
      </div>
      <span className="text-xs text-stone-800">{statusName}</span>
    </div>
  );
}
