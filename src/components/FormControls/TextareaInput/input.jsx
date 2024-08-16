export default function TextareaInput({ register, name, label, placeholder, applyMarginBottom }) {
  return (
    <div>
      <label
        htmlFor={name}
        className={`block  text-sm font-medium text-gray-900  ${
          applyMarginBottom ? "mb-2" : ""
        }
        `}
      >
        {label}
      </label>
      <textarea
        {...register(name)}
        id={name}
        rows={4}
        className="bg-gray-50 hover:bg-white outline-none border border-gray-200 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
