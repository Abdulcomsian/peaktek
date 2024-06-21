import React from "react";
import { Ckeditor } from "@components";
const TextPage = ({ initialEditorData }) => {
  return (
    <div>
      <Ckeditor className="custom-editor" initialData={initialEditorData} />
    </div>
  );
};

export default TextPage;
