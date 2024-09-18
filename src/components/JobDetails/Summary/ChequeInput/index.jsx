import { MoneyIcon } from "@components/UI";

export default function ChequeInput({
  type,
  id,
  name,
  placeholder = "",
  register,
  className,
  readOnly = false,
}) {
  return (
    <div className="relative flex items-center">
      <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
        <MoneyIcon className="w-4" />
      </div>
      <input
        readOnly={readOnly}
        type={type}
        id={id}
        name={name}
        {...register(name)}
        className={`bg-slate-100 hover:bg-bluish border border-bluish hover:border hover:border-indigo-600 text-indigo-600 hover:placeholder:text-indigo-600 text-sm rounded-md focus:outline-none  ps-7 p-[2px] ${className} `}
        placeholder={placeholder}
      />
    </div>
  );
}
