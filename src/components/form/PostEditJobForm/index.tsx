"use client";

import { postNewJob } from "@/services/dataBaseService";
import { useState, useEffect } from "react";

import SuccessJobActions from "./SuccessJobsActions";
import RichTextEditor from "@/components/RichTextEditor";

const PostJobForm = () => {
  const [title, setTitle] = useState("");
  const [jobBody, setJobBody] = useState("");
  const [company, setCompany] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [blob, setBlob] = useState("");

  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (value: string) => {
    setJobBody(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await postNewJob({ title, jobBody, company });
    if (res.success) {
      setFormMessage("Job posted successfully!");
      setBlob(res.blob);
    } else {
      setFormMessage("Error posting job, try again later");
    }
    setLoading(false);
  };

  useEffect(() => {
    setAllowSubmit(
      title.length > 0 && jobBody.length > 0 && company.length > 0
    );
    if (title === "" && jobBody === "" && company === "") {
      setFormMessage("");
    }
  }, [title, jobBody, company]);

  return (
    <>
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

        <div className="form-control">
          <label className="label">
            <span className="label-text">Company</span>
          </label>
          <input
            type="text"
            placeholder="ex.: NoBorderJobs LTDA"
            className="input input-bordered"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="form-control h-60">
          <label className="label">
            <span className="label-text">Job Description</span>
          </label>
          <RichTextEditor value={jobBody} handleChange={handleChange} />
        </div>

        <div className="form-control mt-6">
          <button
            className="btn btn-primary"
            disabled={!allowSubmit || loading}
          >
            Post
          </button>
          <p>{formMessage}</p>
        </div>
      </form>

      {blob !== "" && (
        <SuccessJobActions
          blob={blob}
          setTitle={setTitle}
          setJobBody={setJobBody}
          setCompany={setCompany}
          setAllowSubmit={setAllowSubmit}
        />
      )}
    </>
  );
};

export default PostJobForm;
