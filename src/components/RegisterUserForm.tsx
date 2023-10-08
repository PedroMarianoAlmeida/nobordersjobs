"use client";
import { useState, useEffect } from "react";

const RegisterUserForm = () => {
  const [typedUsername, setTypedUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // TODO: add a debounce
    if (typedUsername.length < 3) {
      setMessage("Username must be at least 3 characters long");
    } else setMessage("");
  }, [typedUsername]);

  return (
    <form className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Check Username availabilities</span>
        </label>
        <input
          type="text"
          placeholder="username"
          className="input input-bordered"
          required
          value={typedUsername}
          onChange={(e) => setTypedUsername(e.target.value)}
        />
        <label className="label">
          <span className="label-text-alt">{message}</span>
        </label>
      </div>

      <div className="form-control mt-6">
        <button className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default RegisterUserForm;
