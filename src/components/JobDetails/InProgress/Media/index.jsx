import React, { useEffect, useState } from "react";
import { Ckeditor, FileUploader, Form } from "@components/FormControls";
import {
  FileIcon,
  GalleryIcon,
  ImageIcon,
  Tabs,
  TabsContentBox,
} from "@components/UI";
import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import toast from "react-hot-toast";
const MediaForm = ({ id, className, data }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const items = [
    { id: 1, title: "Notes", icon: <FileIcon className="mr-1" /> },
    { id: 2, title: "Photos", icon: <GalleryIcon className="mr-1" /> },
  ];
  useEffect(() => {
    if (data) {
      setNotes(data?.notes || "");
    }
  }, [data]);
  const renderActiveTab = () => {
    switch (activeTab) {
      case 1:
        return <Ckeditor value={notes} onChange={setNotes} />;
      case 2:
        return (
          <FileUploader
            icon={<ImageIcon />}
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
            text="Drop your image here, or"
            files={images}
            setFiles={setImages}
            handleDelete={(index) =>
              setImages(images.filter((_, i) => i !== index))
            }
          />
        );
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem("token");
      e.preventDefault();

      const formData = new FormData();
      formData.append("notes", notes);
      images.forEach((file) => {
        formData.append("images[]", file.file);
      });

      const response = await clientBaseURL.post(
        `${clientEndPoints?.storeQCInspectionMedia}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
        setNotes("");
        setImages([]);
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
    <Form onSubmit={handleSubmit} className={className}>
      <TabsContentBox contentTitle="Job Content" className="mb-4">
        <Tabs items={items} activeTab={activeTab} onClick={setActiveTab} />
        {renderActiveTab()}
      </TabsContentBox>
      <Button type="submit" className={`text-white btn-gradient px-4 py-1`}>
        Submit
      </Button>
    </Form>
  );
};

export default MediaForm;
