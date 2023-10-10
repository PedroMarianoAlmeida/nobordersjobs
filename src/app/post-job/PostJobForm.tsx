"use client";

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostJobForm = () => {
  const [title, setTitle] = useState("");
  const [jobBody, setJobBody] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);

  const handleChange = (value: string) => {
    setJobBody(value);
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, jobBody });
  };

  useEffect(() => {
    setAllowSubmit(title.length > 0 && jobBody.length > 0);
  }, [title, jobBody]);

  return (
    <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Job Title</span>
        </label>
        <input
          type="text"
          placeholder="ex.: Software Engineer"
          className="input input-bordered"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-control h-60">
        <label className="label">
          <span className="label-text">Job Title</span>
        </label>

        <ReactQuill
          value={jobBody}
          modules={modules}
          formats={formats}
          onChange={handleChange}
        />
      </div>

      <div className="form-control mt-6">
        <button className="btn btn-primary" disabled={!allowSubmit}>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostJobForm;
