import { Button, Loader } from "@components/UI";
import { baseURL, clientBaseURL } from "@services/config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RenameFileUI({
  files = [],
  id,
  apiDeleteFileEndpoint,
  apiUpdateFileEndPoint,
}) {
  console.log("FILE", files);
  const [inputValues, setInputValues] = useState(
    files.reduce(
      (acc, file) => ({
        ...acc,
        [file.id]: file?.file_name || "", // Initialize with existing file names or empty
      }),
      {}
    )
  );
  const [filesToUpdate, setFilesToUpdate] = useState([]);
  const [loadingStates, setLoadingStates] = useState(
    files.reduce(
      (acc, file) => ({
        ...acc,
        [file.id]: { isSubmitting: false, isDeleting: false },
      }),
      {}
    )
  );

  useEffect(
    function () {
      if (files.length > 0) setFilesToUpdate([...files]);
    },
    [files]
  );

  const handleInputChange = (id, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = async (e, id, fileType) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setLoadingStates((prevStates) => ({
      ...prevStates,
      [id]: { ...prevStates[id], isSubmitting: true },
    }));
    const token = localStorage.getItem("token");

    const body = { file_name: inputValues[id] };
    if (fileType === "primary_image_file_name" || "secondary_image_file_name")
      body["type"] = fileType;

    try {
      const resp = await clientBaseURL.post(
        `${apiUpdateFileEndPoint}/${id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
      }
    } catch (error) {
    } finally {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [id]: { ...prevStates[id], isSubmitting: false },
      }));
    }
  };

  const deleteFileHandler = async (id, image_url, fileType) => {
    console.log("FILE DELETE HANLDER", image_url);
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [id]: { ...prevStates[id], isDeleting: true },
    }));
    const token = localStorage.getItem("token");

    const body = { image_url };
    if (fileType === "primary_image_file_name" || "secondary_image_file_name")
      body["type"] = fileType;

    try {
      const resp = await clientBaseURL.post(
        `${apiDeleteFileEndpoint}/${id}`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (resp.status >= 200 && resp.status < 300) {
        const dataToDelete = resp.data.data;
        toast.success(resp.data.message);
        setFilesToUpdate((files) =>
          files.filter((file) => file.id !== dataToDelete.id)
        );
      }
    } catch (error) {
    } finally {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [id]: { ...prevStates[id], isDeleting: false },
      }));
    }
  };

  const openFileHandler = (id) => {
    const fullFileUrl = `${baseURL}${
      filesToUpdate.find((file) => file.id === id).image_url ||
      filesToUpdate.find((file) => file.id === id).pdf_url ||
      filesToUpdate.find((file) => file.id === id).url ||
      filesToUpdate.find((file) => file.id === id).media_url
    }`;
    window.open(fullFileUrl, "_blank");
  };
  console.log(filesToUpdate);

  return (
    <form className="flex flex-col md:gap-2 mb-4 max-w-full mt-3">
      {filesToUpdate.map((file) => (
        <div key={file.id} className="flex gap-2">
          <input
            className="bg-gray-50 hover:bg-white outline-none border border-gray-300 hover:border-blue-500 text-gray-900 text-sm rounded-md block w-full p-2.5 focus:outline-none focus:border-blue-500"
            placeholder="e.g Image name"
            value={inputValues[file.id] || ""}
            defaultValue={file.file_name}
            onChange={(e) => handleInputChange(file.id, e.target.value)}
          />
          <div className="w-full flex justify-center md:justify-start md:gap-2">
            <Button variant="accent" onClick={() => openFileHandler(file.id)}>
              View File
            </Button>
            <Button
              variant="gradient"
              onClick={(e) => handleSubmit(e, file.id, file.type)}
              disabled={loadingStates[file.id]?.isSubmitting}
            >
              {loadingStates[file.id]?.isSubmitting ? (
                <div className="flex justify-center items-center">
                  <Loader width={"24px"} height={"24px"} color="#fff" />
                </div>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              variant="deleteBtn"
              onClick={() =>
                deleteFileHandler(
                  file.id,
                  file.image_url || file.pdf_url || file.media_url,
                  file.type
                )
              }
              disabled={loadingStates[file.id]?.isDeleting}
            >
              {loadingStates[file.id]?.isDeleting ? (
                <Loader width={"24px"} height={"24px"} color="#fff" />
              ) : (
                <RiDeleteBin6Line size={20} className="text-inherit" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </form>
  );
}
