"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { setSomething } from "@/types/commom";

interface RichTextEditorProps {
  value: string;
  handleChange: setSomething<string>;
}
const RichTextEditor = ({ value, handleChange }: RichTextEditorProps) => {
  if (typeof window === "undefined") {
    return null;
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
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
    "indent",
    "link",
    "image",
  ];

  //TODO: Add a height to the editor
  return (
    <ReactQuill
      value={value}
      modules={modules}
      formats={formats}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
