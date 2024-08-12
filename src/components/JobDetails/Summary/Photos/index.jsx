import React, { useState, useEffect } from "react";
import { ImageIcon } from "@components/UI";
import { FileUploader } from "@components/FormControls";
import { clientBaseURL, clientEndPoints } from "@services/config";
import Button from "@components/JobDetails/Button";
import { toast } from "react-hot-toast";

const Photos = ({ id }) => {
  const token = localStorage.getItem("token");
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getImagesData = async () => {
      try {
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getJobContent}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          // Set filesList if you need to populate existing images
          // setFilesList(response.data.job.images || []);
        }
      } catch (error) {
        if (error?.response) {
          console.error(
            error?.response?.data?.error || error?.response?.data?.message
          );
        }
      }
    };

    if (id) {
      getImagesData();
    }
  }, [id, token]);

  const handleFilesChange = (newFiles) => {
    setFilesList(newFiles);
  };

  const handleDelete = (index) => {
    const newFiles = filesList.filter((_, i) => i !== index);
    setFilesList(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    filesList.forEach((file) => {
      formData.append("images[]", file.file); // Append each image file to 'images[]' key
    });

    try {
      const response = await clientBaseURL.post(
        `${clientEndPoints.updateJobContent}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message);
        setFilesList([]); // Clear the file list
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUploader
        id="image-uploader"
        icon={<ImageIcon />}
        className="mb-4"
        fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
        text=" Drop your image here, or"
        files={filesList} // Ensure this prop is correctly handled in FileUploader
        setFiles={handleFilesChange}
        handleDelete={handleDelete}
      />
      <div className="flex">
        <Button
          type="submit"
          className={`text-white btn-gradient px-4 py-1 ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving" : "Save"}
        </Button>

        <Button className="text-black ml-4 border border-gray-300 px-4 py-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Photos;
