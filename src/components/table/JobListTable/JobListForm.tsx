"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { JobListSearchParams } from "../../../app/job/list/page";

// TODO: Fix the uncontrolled input warning
const JobListForm = ({
  title: currentTitle,
  company: currentCompany,
  curator,
  status: currentStatus,
}: JobListSearchParams) => {
  const router = useRouter();

  const [title, setTitle] = useState(currentTitle);
  const [company, setCompany] = useState(currentCompany);
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    // TODO: Add a debounce to avoid spamming the router
    const newUrl = `?page=1${title ? `&title=${title}` : ""}${
      company ? `&company=${company}` : ""
    }${curator ? `&curator=${curator}` : ""}${
      status ? `&status=${status}` : ""
    }`;
    router.push(newUrl);
  }, [title, company, status]);

  return (
    <form className="card-body flex md:flex-row flex-col md:justify-center items-center w-full">
      <div className="form-control max-w-xs">
        <label className="label md:flex md:items-center md:justify-center">
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

      <div className="form-control max-w-xs">
        <label className="label md:flex md:items-center md:justify-center">
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
      <div>
        <div className="form-control">
          <label className="label cursor-pointer flex align-center">
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500 mr-3"
              checked={status === "open"}
              onClick={() => setStatus("open")}
            />
            <span className="label-text w-full">Only open jobs</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer flex align-center">
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500 mr-3"
              onClick={() => setStatus("")}
              checked={status === ""}
            />
            <span className="label-text w-full">Open and Closed jobs</span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default JobListForm;
