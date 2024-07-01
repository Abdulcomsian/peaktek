import { IoCloudUploadOutline } from "react-icons/io5";

export default function UploaderInputs({
  wrapperClass,
  title = "Upload attachments",
}) {
  return (
    <div className={` ${wrapperClass}`}>
      <label
        htmlFor="attachment_input"
        className="border border-dashed transition-all duration-500	 border-gray-300 rounded-md w-full block py-6 bg-slate-50 cursor-pointer hover:bg-blue-100 hover:border-blue-800"
      >
        <div className="flex items-center justify-center gap-5">
          <IoCloudUploadOutline className="text-[2rem] text-green-600" />

          <div>
            <p className="font-medium md:text-base text-gray-600 text-sm">
              {title}
            </p>
            <p className="text-xs">Drag and drop or click here</p>
          </div>
        </div>
      </label>
      <input type="file" name="" id="attachment_input" className="hidden" />
    </div>
  );
}
