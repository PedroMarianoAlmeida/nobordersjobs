"use client";

import { editJob, postNewJob } from "@/services/dataBaseService";
import { useState, useEffect } from "react";

import SuccessJobActions from "./SuccessJobsActions";
import RichTextEditor from "@/components/RichTextEditor";

interface PostEditJobFormProps {
  initialTitle?: string;
  initialBody?: string;
  initialCompany?: string;
  jobId?: number;
  initialIsOpen?: boolean;
}

const PostEditJobForm = ({
  initialTitle = "",
  initialBody = "",
  initialCompany = "",
  initialIsOpen,
  jobId,
}: PostEditJobFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [jobBody, setJobBody] = useState(initialBody);
  const [company, setCompany] = useState(initialCompany);
  const [isOpen, setIsOpen] = useState(initialIsOpen);
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
    const res = jobId
      ? await editJob({ title, jobBody, company, jobId, isOpen })
      : await postNewJob({ title, jobBody, company });
    if (res.success) {
      setFormMessage("Job posted successfully!");
      setBlob(res.blob);
    } else {
      setFormMessage("Error posting job, try again later");
    }
    setLoading(false);
    setAllowSubmit(false);
  };
  
  useEffect(() => {
    //The jobBody checker is not working as expected
    const contentChanged = jobId
      ? title !== initialTitle ||
        jobBody !== initialBody ||
        company !== initialCompany ||
        isOpen !== initialIsOpen
      : true;

    setAllowSubmit(
      title.length > 0 &&
        jobBody.length > 0 &&
        company.length > 0 &&
        contentChanged
    );
    if (title === "" && jobBody === "" && company === "") {
      setFormMessage("");
    }
  }, [title, jobBody, company, isOpen]);

  return (
    <>
      <form className="card-body" onSubmit={handleSubmit}>
        {jobId !== undefined ? (
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Open Job</span>
              <input
                type="checkbox"
                className={`toggle ${
                  isOpen ? "toggle-success" : "toggle-error"
                }`}
                checked={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </label>
          </div>
        ) : (
          <></>
        )}

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
            {jobId ? "Edit" : "Post"}
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

export default PostEditJobForm;
