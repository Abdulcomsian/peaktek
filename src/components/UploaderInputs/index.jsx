import { useEffect, useRef, useState } from "react";
import UploadedImageItems from "./UploadedImageItems";
import NamedImageItems from "./NamedImageItems";

export default function UploaderInputs({
  wrapperClass,
  text = "Upload attachments",
  name,
  register,
  require = true,
  id,
  fileTypes = [],
  icon,
  multiple = true,
  error,
  defaultFiles=[]
}) {
  const [files, setFiles] = useState([]);

  // useEffect(() => {
  //   if(defaultFiles) setFiles(multiple ? defaultFiles : [defaultFiles])
  // }, [defaultFiles, multiple])

  const handleFiles = (selectedFiles) => {
    const filteredFiles = Array.from([...selectedFiles]).filter((file) =>
      fileTypes.includes(file.type)
    );

    setFiles((files) => [...files, ...filteredFiles]);
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
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex justify-center">{icon}</div>
          <p className="font-poppins text-sm text-gray-600">
            {text} <span className="text-indigo-600 font-medium">browse</span>
          </p>
        </div>
      </label>
      {error && <p className="text-sm mt-1 text-red-500 py-1">{error}</p>}
      {!multiple ? <UploadedImageItems file={defaultFiles} /> : <NamedImageItems files={files} register={register} />}

      <input
        type="file"
        accept={fileTypes.join(",")}
        multiple={multiple}
        id={id}
        name={name}
        className="hidden"
        {...register(name, {
          required: require ? `${name} must be required` : false,
          onChange: handleFileChange,
        })}
      />
    </div>
  );
}
