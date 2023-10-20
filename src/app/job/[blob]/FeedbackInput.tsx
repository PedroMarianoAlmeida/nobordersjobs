"use client";

import { giveFeedbackOnJob } from "@/services/dataBaseServices/userFeedbackOnJobsServices";

interface FeedbackInputProps {
  column: string;
  answer: "Yes" | "No";
  jobId: number;
}

const FeedbackInput = ({ column, answer, jobId }: FeedbackInputProps) => {
  const handleClick = async () => {
    console.log("clicked");
    const res = await giveFeedbackOnJob({ jobId });
  };

  return (
    <input
      type="checkbox"
      className={`checkbox ${
        answer === "Yes" ? "checkbox-success" : "checkbox-error"
      }`}
      onChange={handleClick}
    />
  );
};

export default FeedbackInput;
