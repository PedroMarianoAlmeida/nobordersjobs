import { UserFeedbackOnJobs } from "@prisma/client";

import Table from "@/components/table/Table";
import FeedbackInput from "./FeedbackInput";
import { userSanitizer } from "@/utils/userNameUtils";

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

const UserFeedback = async ({
  jobId,
  userFeedbackOnJobs,
}: UserFeedbackProps) => {
  const user = await userSanitizer();

  if (user.userName === null)
    return <h2>Only logged users can give feedback</h2>;

  const { isOpen, isLegit, isInternational } =
    checkUserFeedback(userFeedbackOnJobs);

  const tableHeaders = [
    { key: "answer", value: "Answer" },
    { key: "isOpen", value: "It is open? 📋" },
    { key: "isLegit", value: "It is legit? 🔎" },
    { key: "isInternational", value: "It is global? 🌎" },
  ];

  type Row = {
    [key: string]: string | JSX.Element;
  };
  const rowYes: Row = {};
  const rowNow: Row = {};
  tableHeaders.forEach(({ key }) => {
    if (key === "answer") {
      rowYes["answer"] = "Yes";
      rowNow["answer"] = "No";
    } else {
      rowYes[key] = (
        <FeedbackInput
          column={key}
          answer="Yes"
          jobId={jobId}
          feedback={{ isOpen, isLegit, isInternational }}
        />
      );
      rowNow[key] = (
        <FeedbackInput
          column={key}
          answer="No"
          jobId={jobId}
          feedback={{ isOpen, isLegit, isInternational }}
        />
      );
    }
  });

  return <Table columnHeaders={tableHeaders} rows={[rowYes, rowNow]} />;
};

export default UserFeedback;
