"use client";
import { useState, useEffect, ChangeEvent } from "react";
import kebabCase from "lodash.kebabcase";
import { checkUserNameExists } from "@/services/dataBaseService";

const RegisterUserForm = () => {
  const [typedUsername, setTypedUsername] = useState("");
  const [sanitizedUsername, setSanitizedUsername] = useState("");

  const [errorMessage, setMessage] = useState("");
  const [sanitizedNameMessage, setSanitizedNameMessage] = useState(<></>);

  const userNameExistChecker = async () => {
    setMessage("Checking username availability...");
    const res = await checkUserNameExists(sanitizedUsername);
    if (res.success) {
      const { exists } = res;
      if (exists) {
        setMessage("Username already exists, try another one");
      } else {
        setMessage("Username available!");
      }
    } else setMessage("Error checking username availability, try again later");
  };

  useEffect(() => {
    if (sanitizedUsername !== "" && sanitizedUsername.length < 3) {
      setMessage("Username must be at least 3 characters long");
    } else {
      userNameExistChecker();
    }
    if (sanitizedUsername !== typedUsername) {
      setSanitizedNameMessage(
        <span className="label-text-alt">
          Username will be{" "}
          <span className="font-bold">{sanitizedUsername}</span>
        </span>
      );
    } else setSanitizedNameMessage(<></>);
  }, [typedUsername]);

  const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: add a debounce
    setTypedUsername(e.target.value);
    setSanitizedUsername(kebabCase(e.target.value));
  };

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
          onChange={updateUsername}
        />
        <label className="label">{sanitizedNameMessage}</label>
        <label className="label">
          <span className="label-text-alt">{errorMessage}</span>
        </label>
      </div>

      <div className="form-control mt-6">
        <button className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default RegisterUserForm;
