import React, { useState } from "react";
import { Ckeditor } from "@components/FormControls";
import Button from "@components/JobDetails/ui/Button";

const Notes = () => {
  const [editorContent, setEditorContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefalut();
    console.log(editorContent);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Ckeditor className="mb-4" />
      <div className="flex">
        <Button type="submit" className=" text-white btn-gradient px-4 py-1">
          Save
        </Button>
        <Button className=" text-black ml-4 border border-gray-300 px-4 py-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Notes;
