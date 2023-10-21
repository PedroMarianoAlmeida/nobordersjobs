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
  // --- All this is looking harder than should ----
  const mapColumnsToValue = {
    "It is open? 📋": { isOpen },
    "It is legit? 🔎": { isLegit },
    "It is global? 🌎": { isInternational },
  };

  const variableToCheck =
    mapColumnsToValue[column as keyof typeof mapColumnsToValue];

  const propertyToCheck = Object.keys(variableToCheck)[0];
  const valueToCheck = Object.values(variableToCheck)[0];

  const handleClick = async () => {
    const res = await giveFeedbackOnJob({
      jobId,
      [propertyToCheck]:
        valueToCheck === true ? null : answer === "Yes" ? true : false,
    });
  };
// ----------------------------------------------------------------
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
