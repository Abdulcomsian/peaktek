import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./ckeditor-styles.css"; // Import your custom CSS here

const Ckeditor = ({ className, initialData, onEditor }) => {
  const [editorData, setEditorData] = useState(initialData || "");

  const handleEditorDataChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    setEditorData(data);
    onEditor(data); // Pass data back to parent component
  };

  return (
    <div className={`${className}`}>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={handleEditorDataChange}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default Ckeditor;
