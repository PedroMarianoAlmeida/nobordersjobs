"use client";
import { useState, useEffect, ChangeEvent } from "react";
import {
  checkUserNameExists,
  postNewUserName,
} from "@/services/dataBaseService";
import { urlFormatter } from "@/utils/text";

const RegisterUserForm = () => {
  const [typedUsername, setTypedUsername] = useState("");
  const [sanitizedUsername, setSanitizedUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [sanitizedNameMessage, setSanitizedNameMessage] = useState(<></>);
  const [loading, setLoading] = useState(false);

  const [allowSubmit, setAllowSubmit] = useState(false);

  const userNameExistChecker = async () => {
    setErrorMessage("Checking username availability...");

    const res = await checkUserNameExists(sanitizedUsername);

    if (res.success) {
      const { exists } = res;

      if (exists) {
        setErrorMessage("Username already exists, try another one");
        setAllowSubmit(false);
      } else {
        setErrorMessage("Username available!");
        setAllowSubmit(true);
      }
    } else {
      setErrorMessage("Error checking username availability, try again later");
      setAllowSubmit(false);
    }
  };

  useEffect(() => {
    if (sanitizedUsername.length < 3) {
      if (typedUsername !== "") {
        setErrorMessage("Username must be at least 3 characters long");
      }
      setAllowSubmit(false);
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
    setSanitizedUsername(urlFormatter(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allowSubmit) {
      if (errorMessage === "") {
        setErrorMessage("You cannot submit"); //Check if this is ever shown (if positive, it is something wrong with validation)
      }
      return;
    }
    setLoading(true);
    const res = await postNewUserName(sanitizedUsername);
    if (res.success) {
      // TODO: Add a redirect to the user page
      setErrorMessage("Welcome to the club!"); //This is not an error, but should be shown as a success message
    } else {
      setErrorMessage("Error submitting username, try again later");
    }
    setSanitizedUsername("");
    setTypedUsername("");
    setLoading(false);
  };

  return (
    <form className="card-body" onSubmit={handleSubmit}>
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
        <button className="btn btn-primary" disabled={!allowSubmit || loading}>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterUserForm;
