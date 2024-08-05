import React, { useState } from "react";
import { ImageIcon } from "@components/UI";
import { FileUploader, Form } from "@components/FormControls";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { Button } from "@components/UI";
import toast from "react-hot-toast";

export default function CarrierScope() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("images[]", file.file);
    });

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
        setImages([]);
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
      <Button type="submit" variant="gradient" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </Form>
  );
}
