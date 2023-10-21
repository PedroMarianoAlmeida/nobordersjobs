"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { giveFeedbackOnJob } from "@/services/dataBaseServices/userFeedbackOnJobsServices";

interface FeedbackInputProps {
  column: string;
  answer: "Yes" | "No";
  jobId: number;

  //Only one value is read , so it is possible refactor this to receive only one of this props
  feedback: {
    isOpen?: boolean | null;
    isLegit?: boolean | null;
    isInternational?: boolean | null;
  };
}

const FeedbackInput = ({
  column,
  answer,
  jobId,
  feedback,
}: FeedbackInputProps) => {
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const propertyToCheck = feedback[column as keyof typeof feedback];
  const handleClick = async () => {
    setSending(true);
    const res = await giveFeedbackOnJob({
      jobId,
      [column]:
        propertyToCheck === true ? null : answer === "Yes" ? true : false,
    });

    if (!res.success) {
      alert("Something went wrong");
    } else {
      router.refresh();
    }
    setSending(false);
  };

  return (
    <input
      type="checkbox"
      className={`checkbox ${
        answer === "Yes" ? "checkbox-success" : "checkbox-error"
      }`}
      onChange={handleClick}
      checked={
        answer === "Yes" ? propertyToCheck === true : propertyToCheck === false
      }
      disabled={sending}
    />
  );
};

export default FeedbackInput;
