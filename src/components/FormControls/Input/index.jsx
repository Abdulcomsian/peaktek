const Input = ({
  className = "",
  label,
  type = "text",
  placeholder,
  id,
  applyMarginBottom = false,
  name = "",
  ref = null,
  register,
  defaultValue,
  disabled,
  required = false,
  error = "",
  inputClass,
  min,
  max,
  readOnly = false,
  maxLength,
  validate,
  onChange = () => {},
  value,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block w-full text-sm font-medium text-gray-900 ${
            applyMarginBottom ? "mb-2" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {register ? (
          <input
            readOnly={readOnly}
            min={min}
            max={max}
            maxLength={maxLength}
            disabled={disabled}
            defaultValue={defaultValue}
            ref={ref}
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            className={`bg-gray-50  ${
              disabled ? "bg-stone-100 cursor-not-allowed" : " bg-white"
            } outline-none border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500 ${inputClass}`}
            {...register?.(
              name,
              {
                required: required ? `${name} must be required` : false,
                validate,
                onChange,
              },
              "Value is required"
            )}
          />
        ) : (
          <input
            readOnly={readOnly}
            min={min}
            max={max}
            maxLength={maxLength}
            disabled={disabled}
            defaultValue={defaultValue}
            ref={ref}
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            className={`bg-gray-50  ${
              disabled ? "bg-stone-100 cursor-not-allowed" : " bg-white"
            } outline-none border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500 ${inputClass}`}
          />
        )}
      </div>
      {error && <p className="text-sm mt-1 text-red-500 py-1">{error}</p>}
    </div>
  );
};

export default Input;
