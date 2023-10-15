"use client";
import RichTextEditor from "@/components/RichTextEditor";
import { useState, useEffect } from "react";
interface CuratorEditDescriptionFormProps {
  name: string;
  currentProfile: string;
}
const CuratorEditDescriptionForm = ({
  name,
  currentProfile,
}: CuratorEditDescriptionFormProps) => {
  const [profile, setProfile] = useState(currentProfile);
  const [allowSubmit, setAllowSubmit] = useState(false);

  const handleChange = (value: string) => {
    if (value === "<p><br></p>") setProfile("");
    else setProfile(value);
  };

  useEffect(() => {
    setAllowSubmit(profile !== currentProfile);
  }, [profile]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit", { profile });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="form-control h-60">
        <label className="label">
          <span className="label-text">Profile Description</span>
        </label>
        <RichTextEditor value={profile} handleChange={handleChange} />
      </div>
      <button className="btn btn-primary" disabled={!allowSubmit}>
        Update
      </button>
    </form>
  );
};

export default CuratorEditDescriptionForm;
