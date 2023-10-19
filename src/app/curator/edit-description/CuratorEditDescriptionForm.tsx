"use client";
import RichTextEditor from "@/components/RichTextEditor";
import { updateCuratorDescription } from "@/services/dataBaseServices/curatorServices";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (value: string) => {
    if (value === "<p><br></p>") setProfile("");
    else setProfile(value);
  };

  const updateCuratorDescriptionHandler = async () => {
    setLoading(true);
    const res = await updateCuratorDescription(profile);
    if (res.success) {
      setMessage("success");
    } else {
      setMessage("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    setAllowSubmit(profile !== currentProfile);
  }, [profile]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCuratorDescriptionHandler();
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="form-control h-60">
          <label className="label">
            <span className="label-text">Profile Description</span>
          </label>
          <RichTextEditor value={profile} handleChange={handleChange} />
        </div>
        <button className="btn btn-primary" disabled={!allowSubmit || loading}>
          Update
        </button>
      </form>
      <p>{message}</p>
    </>
  );
};

export default CuratorEditDescriptionForm;
