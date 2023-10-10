"use client";

import { useState } from "react";

const PostJobForm = () => {
  const [title, setTitle] = useState("");
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

      <div className="form-control mt-6">
        <button className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default PostJobForm;
