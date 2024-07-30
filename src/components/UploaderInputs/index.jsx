import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

export default function UploaderInputs({
  wrapperClass,
  title = "Upload attachments",
  name,
  register,
  require = true,
  id,
  fileTypes = [],
  setFiles,
  files = [],
  icon,
}) {
  const [images, setImage] = useState("");

  const handleFiles = (selectedFiles) => {
    const filteredFiles = Array.from(selectedFiles).filter((file) =>
      fileTypes.includes(file.type)
    );

    const newFiles = filteredFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles([...files, ...newFiles]);
  };

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

  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
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
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-medium mb-2">File Previews</h3>
          <ul className="flex flex-wrap">
            {files.map((file, index) => (
              <li key={index} className="m-2 relative">
                <div className="border border-gray-400 p-2 rounded-lg">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-32 h-32 object-cover mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="absolute bottom-2 right-2 text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                  <p className="text-sm">{getShortFileName(file.file.name)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
