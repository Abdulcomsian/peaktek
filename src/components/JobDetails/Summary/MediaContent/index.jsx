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
import { clientBaseURL, clientEndPoints } from "@services/config";
import toast from "react-hot-toast";
import { RenameFiles } from "@components/JobDetails";
const MediaContent = ({ id, className }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [showRenameBox, setShowRenameBox] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const items = [
    { id: 1, title: "Notes", icon: <FileIcon className="mr-1" /> },
    { id: 2, title: "Photos", icon: <GalleryIcon className="mr-1" /> },
  ];
  useEffect(() => {
    const getMediaContent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getJobContent}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          setShowRenameBox(true);
          setFiles(response?.data?.job?.images);
          setNotes(response?.data?.job?.notes);
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
      getMediaContent();
    }
  }, [id]);

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
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("notes", notes);
      images.forEach((file) => {
        formData.append("images[]", file.file);
      });

      const response = await clientBaseURL.post(
        `${clientEndPoints?.updateJobContent}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
        // setNotes("");
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
  console.log("files in summery", files);
  return (
    <Form onSubmit={handleSubmit} className={className}>
      <TabsContentBox contentTitle="Job Content" className="mb-4">
        <Tabs items={items} activeTab={activeTab} onClick={setActiveTab} />
        {renderActiveTab()}
      </TabsContentBox>
      {/* Conditional Rendering */}
      {activeTab === 2 &&
        showRenameBox &&
        files?.map((file) => <RenameFiles file={file} key={file?.id} />)}
      <Button
        type="submit"
        className={`text-white btn-gradient px-4 py-1`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <Loader width={"28px"} height={"28px"} color="#fff" />
          </div>
        ) : (
          "Submit"
        )}
      </Button>
    </Form>
  );
};

export default MediaContent;
