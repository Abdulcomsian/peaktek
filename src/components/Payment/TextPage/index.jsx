import React from "react";
import { CkeditorComponent } from "@components";
const TextPage = ({ initialEditorData }) => {
  return (
    <div>
      <CkeditorComponent
        className="custom-editor"
        initialData={initialEditorData}
      />
    </div>
  );
};

export default TextPage;
