import { useEffect, useState } from "react";
// import "./ckeditor-styles.css"; // Import your custom CSS here
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { Controller } from "react-hook-form";

const CkeditorControlled = ({
  className,
  value,
  onChange,
  id,
  label,
  control,
  name,
  applyMarginBottom,
}) => {
  const [editorData, setEditorData] = useState(value || "");
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

  const handleProcedureContentChange = (content) => {
    setEditorData(content);
    onChange(content, id);
  };

  useEffect(() => {
    if (value) setEditorData(value);
  }, [value]);

  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block w-full text-sm font-medium text-gray-900 ${
            applyMarginBottom ? "mb-2" : ""
          }`}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default CkeditorControlled;
