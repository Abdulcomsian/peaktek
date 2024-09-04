export default function NumJob({
  title,
  number,
  varient,
  className,
  onClick = () => {},
}) {
  const baseStyle = "py-5 text-center rounded-3xl space-y-2 ";

  const varients = {
    gray: baseStyle + "text-stone-900 bg-stone-200",
  };
  return (
    <div className={`${varients[varient]} ${className}`} onClick={onClick}>
      <p className="text-xl font-medium">{title}</p>
      <p className="text-3xl font-bold">{number}</p>
    </div>
  );
}
