import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function UploaderInputs({
  wrapperClass,
  title = "Upload attachments",
  name,
  register,
  require = true,
  id,
}) {
  const [images, setImage] = useState("");

  const handleFileChange = function (e) {
    setImage(e.target.files[0].name);
  };
  return (
    <div className={` ${wrapperClass}`}>
      <label
        htmlFor={id}
        className="border border-dashed transition-all duration-500	 border-gray-300 rounded-md w-full block py-6 bg-slate-50 cursor-pointer hover:bg-blue-100 hover:border-blue-800"
      >
        <div className="flex items-center justify-center gap-5">
          <IoCloudUploadOutline className="text-[2rem] text-green-600" />

          <div>
            <p className="font-medium md:text-base text-gray-600 text-sm">
              {title}
            </p>
            {images ? (
              <p className="text-xs border border-green-400 p-1 rounded-md bg-green-100">
                {images}
              </p>
            ) : (
              <p className="text-xs">"Drag and drop or click here"</p>
            )}
          </div>
        </div>
      </label>
      <input
        type="file"
        id={id}
        name={name}
        className="hidden"
        {...register(name, {
          require: require,
          onChange: handleFileChange,
        })}
      />
    </div>
  );
}
