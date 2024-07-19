import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./ckeditor-styles.css"; // Import your custom CSS here
import ReactQuill from "react-quill";
import { render } from "react-dom";
import "react-quill/dist/quill.snow.css";

const Ckeditor = ({ className, initialData, onEditor, onDataChange }) => {
  const [editorData, setEditorData] = useState(initialData || "");
  const [code, setCode] = useState("hellllo");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setEditorData(content);
    onDataChange(content);
  };

  useEffect(
    function () {
      if (initialData) setEditorData(initialData);
    },
    [initialData]
  );

  return (
    <div className={`${className}`}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={editorData}
        onChange={handleProcedureContentChange}
      />
    </div>
  );
};

export default Ckeditor;
