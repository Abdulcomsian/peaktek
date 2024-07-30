import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { ArrowFileIcon, ImageIcon } from "@components/UI";

export default function UploaderInputs({
  wrapperClass,
  title = "Upload attachments",
  name,
  register,
  require = true,
  id,
  fileTypes = [],
  icon,
  handleDelete,
}) {
  const [images, setImage] = useState("");
  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    console.log("selectedFiles", selectedFiles);
    const filteredFiles = Array.from([...selectedFiles]).filter((file) =>
      fileTypes.includes(file.type)
    );

    console.log("Filtered Files", filteredFiles);

    setFiles((files) => [...files, ...filteredFiles]);
  };
  console.log("FINAL FILES TO SHOW", files);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const getShortFileName = (name) => {
    const [fileName, extension] = name.split(".");
    if (fileName.length > 5) {
      return `${fileName.substring(0, 5)}...${extension}`;
    }
    return name;
  };

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={id}
        className="w-full flex items-center justify-center border-2 border-dotted border-blue-500 rounded-lg py-10 px-4 bg-white cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center gap-5">
          <div>{icon}</div>
          <div>
            <p className="font-medium md:text-base text-gray-600 text-sm">
              {title}
            </p>
            {images ? (
              <p className="text-xs border border-green-400 p-1 rounded-md bg-green-100">
                {images}
              </p>
            ) : (
              <p className="text-xs">Drag and drop or click here</p>
            )}
          </div>
        </div>
      </label>
      <input
        type="file"
        accept={fileTypes.join(",")}
        multiple
        id={id}
        name={name}
        className="hidden"
        {...register(name, {
          required: require,
          onChange: handleFileChange,
        })}
      />
      {files?.length > 0 && (
        <div className="mt-4">
          <p>test</p>
          <ul>
            {files.map((file, index) => (
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
      )}
    </div>
  );
}
