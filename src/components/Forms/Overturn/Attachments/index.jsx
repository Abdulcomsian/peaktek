import React, { useState, useEffect } from "react";
import { Ckeditor, FileUploader, Form } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { ArrowFileIcon, ImageIcon, Loader } from "@components/UI";
import { toast } from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "@services/config";
import RenameFiles from "@components/Forms/Overturn/RenameFiles";
import { useParams } from "react-router-dom";
const OverturnAttachments = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showRenameBox, setShowRenameBox] = useState(false);
  const [overturnData, setOverturnData] = useState(null);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [manufacturerDocuments, setManufacturerDocuments] = useState([]);
  const [notes, setNotes] = useState("");

  const getOverturnData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      setLoading(true);
      const response = await clientBaseURL.get(
        `${clientEndPoints?.getOverturn}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response in overturn", response);
      if (response?.status >= 200 && response?.status < 300) {
        setShowRenameBox(true);
        setOverturnData(response?.data?.data);
        setNotes(response?.data?.data?.notes);
      }
    } catch (error) {
      if (error?.response) {
        console.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOverturnData();
  }, []);
  // Function to refresh data after a file name change
  const refreshData = () => {
    getOverturnData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("images[]", file.file);
    });
    documents.forEach((file) => {
      formData.append("attachments[]", file.file);
    });
    manufacturerDocuments.forEach((file) => {
      formData.append("manufacturer_attachments[]", file.file);
    });
    formData.append("notes", notes);

    try {
      const response = await clientBaseURL.post(
        `${clientEndPoints?.updateOverturn}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(response?.data?.message);
        await getOverturnData();
        setShowRenameBox(true);
        setDocuments([]);
        setImages([]);
        setManufacturerDocuments([]);
        // setNotes("");
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
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mr-4">
          <FileUploader
            label="Images"
            id="images"
            icon={<ImageIcon />}
            className="mb-4"
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your image here, or"
            files={images}
            setFiles={setImages}
            handleDelete={(index) =>
              setImages(images.filter((_, i) => i !== index))
            }
          />
          {showRenameBox &&
            overturnData?.images?.map((file) => (
              <RenameFiles
                file={file}
                key={file?.id}
                id={file?.id}
                refreshData={refreshData}
              />
            ))}
        </div>
        <div className="w-full mr-4">
          <FileUploader
            label="Documents"
            id="documents"
            icon={<ArrowFileIcon />}
            className="w-full mb-4"
            fileTypes={["application/pdf"]}
            text="Drop your documents here, or"
            files={documents}
            setFiles={setDocuments}
            handleDelete={(index) =>
              setDocuments(documents.filter((_, i) => i !== index))
            }
          />

          {showRenameBox &&
            overturnData?.attachments?.map((file) => (
              <RenameFiles
                file={file}
                key={file?.id}
                id={file?.id}
                refreshData={refreshData}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mr-4">
          <FileUploader
            label="Manufacturer Document"
            id="manufacturer_document"
            icon={<ArrowFileIcon />}
            className="w-full mb-4 mr-4"
            fileTypes={["application/pdf"]}
            text="Drop your documents here, or"
            files={manufacturerDocuments}
            setFiles={setManufacturerDocuments}
            handleDelete={(index) =>
              setManufacturerDocuments(
                manufacturerDocuments.filter((_, i) => i !== index)
              )
            }
          />
          {showRenameBox &&
            overturnData?.manufacturer_attachments?.map((file) => (
              <RenameFiles
                file={file}
                key={file?.id}
                id={file?.id}
                refreshData={refreshData}
              />
            ))}
        </div>
        <Ckeditor
          className="w-full max-w-2xl mb-4"
          label="Notes"
          id="notes"
          value={notes}
          onChange={setNotes}
        />
      </div>
      <Button
        type="submit"
        className="w-full max-w-20 text-white btn-gradient px-4 py-1"
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader width={"24px"} height={"24px"} color="#fff" />
          </div>
        ) : (
          "Save"
        )}
      </Button>
    </Form>
  );
};

export default OverturnAttachments;
