"use client";
interface FeedbackInputProps {
  column: string;
  answer: "Yes" | "No";
}

const FeedbackInput = ({ column, answer }: FeedbackInputProps) => {
  return (
    <input
      type="checkbox"
      className={`checkbox ${
        answer === "Yes" ? "checkbox-success" : "checkbox-error"
      }`}
    />
  );
};

export default FeedbackInput;
