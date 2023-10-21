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
    { key: "answer", value: <div className="text-center">Answer</div> },
    { key: "isOpen", value: <div className="text-center">It is open? 📋</div> },
    {
      key: "isLegit",
      value: <div className="text-center">It is legit? 🔎</div>,
    },
    {
      key: "isInternational",
      value: <div className="text-center">It is global? 🌎</div>,
    },
  ];

  type Row = {
    [key: string]: string | JSX.Element;
  };
  const rowYes: Row = {};
  const rowNow: Row = {};
  tableHeaders.forEach(({ key }) => {
    if (key === "answer") {
      rowYes["answer"] = <div className="text-center">Yes 👍</div>;
      rowNow["answer"] = <div className="text-center">No 👎</div>;
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
