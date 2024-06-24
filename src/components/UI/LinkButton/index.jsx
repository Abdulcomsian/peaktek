import { Link } from "react-router-dom";

export default function LinkButton({ children, onClick, to }) {
  const className = `border-none text-xs text-blue-300 cursor-pointer hover:text-blue-400`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
