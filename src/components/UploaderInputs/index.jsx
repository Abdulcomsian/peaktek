import { IoCloudUploadOutline } from "react-icons/io5";

export default function UploaderInputs() {
  return (
    <div>
      <label
        htmlFor="attachment_input"
        className="border border-dashed border-gray-300 rounded-md w-full block py-6 bg-slate-50 mt-4 cursor-pointer"
      >
        <div className="flex items-center justify-center gap-5">
          <IoCloudUploadOutline className="text-[2rem] text-green-600" />

          <div>
            <p className="font-medium text-base text-gray-600">
              Upload attachments
            </p>
            <p className="text-xs">Drag and drop or click here</p>
          </div>
        </div>
      </label>
      <input type="file" name="" id="attachment_input" className="hidden" />
    </div>
  );
}
