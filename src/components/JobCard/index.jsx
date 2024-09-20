import { Link } from "react-router-dom";

export default function JobCard({
  label,
  number,
  className = "",
  labeClassName = "",
  to = "",
  onClick = () => {},
}) {
  if (to)
    return (
      <Link to={to} className="inline-block w-full">
        <div
          className={`text-stone-900 bg-[#efefef] grow p-5 rounded-xl space-y-2  ${className}`}
        >
          <p className={`text-lg sm:text-xl text-right`}>{number}</p>
          <p className={`text-base font-light ${labeClassName}`}>{label}</p>
        </div>
      </Link>
    );

  if (onClick)
    return (
      <div
        onClick={onClick}
        className={`text-stone-900 bg-[#efefef] grow p-5 rounded-xl space-y-2  ${className}`}
      >
        <p className={`text-lg sm:text-xl text-right`}>{number}</p>
        <p className={`text-base font-light ${labeClassName}`}>{label}</p>
      </div>
    );
  return (
    <div className={`p-5 rounded-xl space-y-2 ${className}`}>
      <p className="text-lg sm:text-xl text-right">{number}</p>
      <p className={`text-base font-light ${labeClassName}`}>{label}</p>
    </div>
  );
}
