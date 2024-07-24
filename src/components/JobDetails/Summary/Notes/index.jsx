import React, { useState } from "react";
import { Ckeditor } from "@components/FormControls";
import Button from "@components/JobDetails/ui/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import toast from "react-hot-toast";
const Notes = () => {
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem("token");
      e.preventDefault();
      setLoading(true);

      const response = await clientBaseURL.post(
        `${clientEndPoints?.updateJobContent}/${1}`,
        { notes: editorContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Ckeditor className="mb-4" onDataChange={setEditorContent} />
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

export default Notes;
