import Link from "next/link";
import type { setSomething } from "@/types/commom";

interface SuccessJobActionsProps {
  blob: string;
  setTitle: setSomething<string>;
  setJobBody: setSomething<string>;
  setCompany: setSomething<string>;
  setAllowSubmit: setSomething<boolean>;
}

const SuccessJobActions = ({
  blob,
  setTitle,
  setCompany,
  setJobBody,
  setAllowSubmit,
}: SuccessJobActionsProps) => {
  const clearForm = () => {
    setTitle("");
    setCompany("");
    setJobBody("");
    setAllowSubmit(false);
  };
  return (
    <div className="">
      <h3>Job posted! What do you want do do?</h3>
      <button className="btn btn-secondary" onClick={clearForm}>
        Post another job
      </button>

      <button className="btn btn-secondary">
        <Link href={`/job/${blob}`}>Visit job details </Link>
      </button>
    </div>
  );
};

export default SuccessJobActions;
