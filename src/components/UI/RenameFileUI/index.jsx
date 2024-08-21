import { Input } from "@components/FormControls";
import { Button } from "@components/UI";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RenameFileUI({ file, id }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = function (e) {
    console.log("clicked");
  };

  const deleteFilehandler = function () {
    console.log("DELETE BUTTON CLICKED");
  };

  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${file?.media_url}`;
    window.open(fullFileUrl, "_blank");
  };
  return (
    <div className="flex flex-col md:flex-row md:gap-2 mb-4 max-w-full">
      <Input placeholder="e.g Image name" />
      <div className="w-full flex justify-center md:justify-start md:gap-2">
        <Button variant="accent" onClick={openFileHandler}>
          View File
        </Button>

        <Button
          variant="gradient"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <Loader width={"24px"} height={"24px"} color="#fff" />
            </div>
          ) : (
            "Save"
          )}
        </Button>
        <Button variant="deleteBtn" onClick={deleteFilehandler}>
          <RiDeleteBin6Line size={20} className="text-inherit" />
        </Button>
      </div>
    </div>
  );
}
