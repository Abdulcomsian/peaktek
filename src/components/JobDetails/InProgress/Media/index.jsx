import React, { useEffect, useState } from "react";
import { Ckeditor, FileUploader, Form } from "@components/FormControls";
import {
  FileIcon,
  GalleryIcon,
  ImageIcon,
  Loader,
  Tabs,
  TabsContentBox,
} from "@components/UI";

import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints, baseURL } from "@services/config";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import RenameFiles from "@components/JobDetails/InProgress/RenameFiles";

const MediaForm = ({ className, data, showRenameBox, filesData }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      e.preventDefault();
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
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
        setImages([]);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <TabsContentBox className="mb-4">
        <Tabs items={items} activeTab={activeTab} onClick={setActiveTab} />
        {renderActiveTab()}
      </TabsContentBox>

      {/* Conditional Rendering */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`text-white btn-gradient px-4 py-1 ${
          activeTab === 2 && "mb-4"
        }`}
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <Loader width={"24px"} height={"24px"} color="#fff" />
          </div>
        ) : (
          "Save"
        )}
      </Button>
      {activeTab === 2 &&
        showRenameBox &&
        filesData?.map((file) => <RenameFiles file={file} key={file?.id} />)}
    </Form>
  );
};

export default MediaForm;
