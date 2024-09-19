export default function ColoredCirleByDays({ days, className }) {
  let spotColorToShow = "";
  if (days >= 0 && days <= 6) spotColorToShow += "bg-green-500";
  if (days >= 7 && days <= 14) spotColorToShow += "bg-yellow-500";
  if (days >= 14) spotColorToShow += "bg-red-500";

  return (
    <span
      className={`w-1 h-1 inline-block ${spotColorToShow} rounded-full ${className}`}
    ></span>
  );
}
