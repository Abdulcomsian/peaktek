import { Link } from "react-router-dom";

export default function LinkButton({ children, onClick, to, className = "" }) {
  const style = `border-none text-xs text-blue-300 cursor-pointer hover:text-blue-400 ${className}`;

  if (to) {
    return (
      <Link to={to} className={style}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
}
