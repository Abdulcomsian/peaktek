import { ArrowFileIcon, ImageIcon } from "@components/UI";
import { FaTrashAlt } from "react-icons/fa";

export default function UploadedImageItems({ file, defaultFiles }) {
  const displayFile = file[0]; 
  if(!displayFile) return null;
  return (
    <div className="flex items-center justify-between border p-2 rounded mb-2 mt-4">
      <div className="mr-2">
        {displayFile?.type?.startsWith("image/") ? (
          <ImageIcon />
        ) : (
          <ArrowFileIcon />
        )}
      </div>
      <p className="text-sm">{displayFile?.name}</p>

      <button
        type="button"
        // onClick={() => handleDelete(index)}
        className="text-red-600"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
}
