import { useState } from "react";
import { Ckeditor, FileUploader, Form } from "@components/FormControls";
import Button from "@components/JobDetails/ui/Button";
import { ArrowFileIcon, ImageIcon } from "@components/UI";
import React from "react";
import { toast } from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { useParams } from "react-router-dom";
const OverturnAttachments = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [manufacturerDocuments, setManufacturerDocuments] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

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
      formData.append("manufacturer_documents[]", file.file);
    });
    formData.append("notes", notes);
    console.log("form data", formData);
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
        toast.success(response.data.message);
        setDocuments([]);
        setImages([]);
        setManufacturerDocuments([]);
        setNotes("");
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
        <FileUploader
          label="Images"
          id="images"
          icon={<ImageIcon />}
          className="w-full mb-4 mr-4"
          fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
          text="Drop your image here, or"
          files={images}
          setFiles={setImages}
          handleDelete={(index) =>
            setImages(images.filter((_, i) => i !== index))
          }
        />
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
      </div>
      <div className="flex flex-col md:flex-row">
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
        <Ckeditor
          className="w-full max-w-2xl mb-4"
          label="Notes"
          id="notes"
          initialData={notes}
          onDataChange={setNotes}
        />
      </div>
      <Button
        type="submit"
        className={`text-white btn-gradient px-4 py-1`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </Form>
  );
};

export default OverturnAttachments;
