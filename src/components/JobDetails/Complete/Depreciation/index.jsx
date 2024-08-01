import React from "react";

const Depreciation = ({
  name,
  value,
  handleChange,
  handleBlur,
  errors,
  touched,
  inputRefs,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-black text-xl font-medium mb-2">Depreciation</h2>
      <p className="font-poppins text-sm leading-7">
        We request that the depreciation on this loss claim be released to
        <span className="inline-flex items-center mx-2">
          <input
            className={`px-2 py-1 bg-gray-100 outline-none text-gray-900 text-sm rounded-md inline-block w-full max-w-xs ${
              errors[name] && touched[name]
                ? "border-red-600 border"
                : "border-gray-300"
            }`}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter released to value"
            ref={inputRefs}
          />
        </span>
        as the work has been completed and meets all requirements set forth by
        the insurance policy. We have thoroughly inspected the completed work
        and ensured that it meets all of the standards set forth by the
        insurance policy.
      </p>
      {errors[name] && touched[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );
};

export default Depreciation;
