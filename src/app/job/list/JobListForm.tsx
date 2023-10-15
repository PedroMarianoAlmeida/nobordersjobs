"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { JobListSearchParams } from "./page";

// TODO: Fix the uncontrolled input warning
const JobListForm = ({
  page,
  title: currentTitle,
  company: currentCompany,
  curator,
}: JobListSearchParams) => {
  const router = useRouter();

  const [title, setTitle] = useState(currentTitle);
  const [company, setCompany] = useState(currentCompany);

  useEffect(() => {
    // TODO: Add a debounce to avoid spamming the router
    const newUrl = `?page=1${title ? `&title=${title}` : ""}${
      company ? `&company=${company}` : ""
    }${curator ? `&curator=${curator}` : ""}`;
    router.push(newUrl);
  }, [title, company]);

  return (
    <form className="card-body">
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
    </form>
  );
};

export default JobListForm;
