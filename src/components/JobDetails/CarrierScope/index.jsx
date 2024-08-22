import React, { useEffect, useState } from "react";
import { ImageIcon, RenameFileUI } from "@components/UI";
import { FileUploader, Form } from "@components/FormControls";
import { Button } from "@components/UI";
import { Input } from "@components/FormControls";
import toast from "react-hot-toast";
import {
  createCarrierScope,
  getCarrierScope,
} from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CarrierScope() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [defaultImages, setDefaultImages] = useState(null);

  useEffect(() => {
    async function fetchCarrierScope() {
      const resp = await getCarrierScope(id);
      if (resp.status >= 200 && resp.status < 300) {
        console.log(resp);
        setDefaultImages(resp.data.data);
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const handleSubmit = function (e) {
  //   console.log("clicked");
  // };

  const deleteFilehandler = function () {
    console.log("DELETE BUTTON CLICKED");
  };

  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${file?.media_url}`;
    window.open(fullFileUrl, "_blank");
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
      {defaultImages && <RenameFileUI files={defaultImages} />}
      <Button type="submit" variant="gradient" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </Form>
  );
}
