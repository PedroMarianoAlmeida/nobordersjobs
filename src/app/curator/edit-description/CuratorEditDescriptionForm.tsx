"use client";
import RichTextEditor from "@/components/RichTextEditor";
import { useState } from "react";
interface CuratorEditDescriptionFormProps {
  name: string;
  currentProfile: string;
}
const CuratorEditDescriptionForm = ({
  name,
  currentProfile,
}: CuratorEditDescriptionFormProps) => {
  const [profile, setProfile] = useState(currentProfile);
  const handleChange = (value: string) => {
    setProfile(value);
  };

  return (
    <div>
      <RichTextEditor value={profile} handleChange={handleChange} />
    </div>
  );
};

export default CuratorEditDescriptionForm;
