import { Input } from "@components/FormControls";
import { Button } from "@components/UI";
import { baseURL } from "@services/config";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RenameFileUI({ files, id }) {
  console.log(files);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = function (e) {
    console.log("clicked");
  };

  const deleteFilehandler = function () {
    console.log("DELETE BUTTON CLICKED");
  };

  const openFileHandler = (id) => {
    console.log(id, files.filter((file) => file.id === id)[0]);
    const fullFileUrl = `${baseURL}${
      files.filter((file) => file.id === id)[0].image_url
    }`;
    window.open(fullFileUrl, "_blank");
  };
  return (
    <form className="flex flex-col md:gap-2 mb-4 max-w-full">
      {files.map((imageRow) => (
        <div className="flex gap-2">
          <Input placeholder="e.g Image name" />
          <div className="w-full flex justify-center md:justify-start md:gap-2">
            <Button
              variant="accent"
              onClick={() => openFileHandler(imageRow.id)}
            >
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
      ))}
    </form>
  );
}
