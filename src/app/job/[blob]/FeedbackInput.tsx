"use client";

import { giveFeedbackOnJob } from "@/services/dataBaseServices/userFeedbackOnJobsServices";

interface FeedbackInputProps {
  column: string;
  answer: "Yes" | "No";
  jobId: number;

  //Only one value is read , so it is possible refactor this to receive only one of this props
  isOpen?: boolean | null;
  isLegit?: boolean | null;
  isInternational?: boolean | null;
}

const FeedbackInput = ({
  column,
  answer,
  jobId,
  isOpen,
  isLegit,
  isInternational,
}: FeedbackInputProps) => {
  const mapColumnsToValue = {
    "It is open? 📋": isOpen,
    "It is legit? 🔎": isLegit,
    "It is global? 🌎": isInternational,
  };
  
  const handleClick = async () => {
    const res = await giveFeedbackOnJob({ jobId });
  };

  const valueToCheck =
    mapColumnsToValue[column as keyof typeof mapColumnsToValue];

  return (
    <input
      type="checkbox"
      className={`checkbox ${
        answer === "Yes" ? "checkbox-success" : "checkbox-error"
      }`}
      onChange={handleClick}
      checked={
        answer === "Yes" ? valueToCheck === true : valueToCheck === false
      }
    />
  );
};

export default FeedbackInput;
