import React, { useEffect, useState } from "react";
import { ImageIcon } from "@components/UI";
import { FileUploader, Form } from "@components/FormControls";
import { Button } from "@components/UI";
import toast from "react-hot-toast";
import {
  createCarrierScope,
  getCarrierScope,
} from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";

export default function CarrierScope() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchCarrierScope() {
      const resp = await getCarrierScope(id);
      if (resp.status >= 200 && resp.status < 300) {
      }
    }
    if (id) fetchCarrierScope();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imagesToLoad = images.map((image) => image.file);
      const response = await createCarrierScope(imagesToLoad, id);

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
