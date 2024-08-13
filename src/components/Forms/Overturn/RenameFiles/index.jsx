import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TextBox } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { baseURL, clientBaseURL, clientEndPoints } from "@services/config";

const RenameFiles = ({ file, id }) => {
  console.log("file in overturn", file);
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    if (file?.file_name) {
      setFileName(file?.file_name);
    }
  }, [file]);
  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${file?.media_url}`;
    window.open(fullFileUrl, "_blank");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.post(
        `${clientEndPoints?.updateOverturnFilename}/${id}`,
        { file_name: fileName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center mb-4">
      <TextBox
        placeholder={`Enter file ${file?.id} name`}
        type="text"
        id="file_name"
        name="file_name"
        className="md:mr-4 mb-4 md:mb-0 md:max-w-md"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <div className="flex justify-center">
        <Button
          type="button"
          className="bg-green-500 hover:bg-green-700 px-4 py-1 mr-4 text-white"
          onClick={openFileHandler}
        >
          View File
        </Button>
        <Button
          className="text-white btn-gradient px-4 py-1"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default RenameFiles;
