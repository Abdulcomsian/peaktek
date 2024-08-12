import { ArrowFileIcon, ImageIcon } from "@components/UI";
import { FaTrashAlt } from "react-icons/fa";

export default function UploadedImageItems({ files }) {
  if (files.length === 0) return null;
  return (
    <div className="mt-4">
      <ul>
        {files?.map((file, index) => (
          <li
            key={index}
            className="flex items-center justify-between border p-2 rounded mb-2"
          >
            <div className="mr-2">
              {file.type.startsWith("image/") ? (
                <ImageIcon />
              ) : (
                <ArrowFileIcon />
              )}
            </div>
            <p className="text-sm">{file.name}</p>

            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="text-red-600"
            >
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
