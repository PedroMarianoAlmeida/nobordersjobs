import { UserFeedbackOnJobs } from "@prisma/client";

import Table from "@/components/table/Table";
import FeedbackInput from "./FeedbackInput";
import { use } from "react";

const checkUserFeedback = (userFeedbackOnJobs: UserFeedbackOnJobs[] | null) => {
  if (userFeedbackOnJobs === null || userFeedbackOnJobs.length === 0)
    return {
      isOpen: undefined,
      isLegit: undefined,
      isInternational: undefined,
    };
  const { isOpen, isLegit, isInternational } = userFeedbackOnJobs[0];
  return { isOpen, isLegit, isInternational };
};

interface UserFeedbackProps {
  jobId: number;
  userFeedbackOnJobs: UserFeedbackOnJobs[] | null;
}

const UserFeedback = ({ jobId, userFeedbackOnJobs }: UserFeedbackProps) => {
  const { isOpen, isLegit, isInternational } =
    checkUserFeedback(userFeedbackOnJobs);

    const columnHeaders = [
    "Answer",
    "It is open? 📋",
    "It is legit? 🔎",
    "It is global? 🌎",
  ];

  type Row = {
    [key: string]: string | JSX.Element;
  };
  const rowYes: Row = {};
  const rowNow: Row = {};
  columnHeaders.forEach((column) => {
    if (column === "Answer") {
      rowYes["Answer"] = "Yes";
      rowNow["Answer"] = "No";
    } else {
      rowYes[column] = (
        <FeedbackInput
          column={column}
          answer="Yes"
          jobId={jobId}
          isOpen={isOpen}
          isLegit={isLegit}
          isInternational={isInternational}
        />
      );
      rowNow[column] = (
        <FeedbackInput
          column={column}
          answer="No"
          jobId={jobId}
          isOpen={isOpen}
          isLegit={isLegit}
          isInternational={isInternational}
        />
      );
    }
  });

  return <Table columnHeaders={columnHeaders} rows={[rowYes, rowNow]} />;
};

export default UserFeedback;
