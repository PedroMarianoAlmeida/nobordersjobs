import { Jobs } from "@prisma/client";
import Link from "next/link";

import { JobListSearchParams } from "@/types/queryParams";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import Tooltip from "@/components/Tooltip";

const UserActions = ({
  blob,
  isCurator,
}: {
  blob: string;
  isCurator?: boolean;
}) => (
  <div className="flex gap-2">
    <Link href={`/job/${blob}`}>
      <span className="underline">See</span>
    </Link>
    {isCurator && (
      <Link href={`/job/${blob}/edit`}>
        <span className="underline">Edit</span>
      </Link>
    )}
  </div>
);

const HeaderGroup = () => (
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th colSpan={3} className="text-center bg-gray-700">
      <Tooltip
        content={
          <ul>
            <li>📋 = Open</li>
            <li>🔎 = Legit</li>
            <li>🌎 = International</li>
            <li>👍 = Yes</li> <li>👎 = No</li>
          </ul>
        }
      >
        <span className="underline">
          User Feedback<sup>*</sup>
        </span>
      </Tooltip>
    </th>
    <th></th>
  </tr>
);

const UserFeedbackHeader = ({
  content,
  tooltipText,
}: {
  content: string;
  tooltipText: string;
}) => (
  <div className="text-center text-xl cursor-pointer">
    <div className="tooltip" data-tip={tooltipText}>
      {content}
    </div>
  </div>
);

interface UserFeedbackProps {
  positiveCount: number;
  negativeCount: number;
}
const UserFeedback = ({ positiveCount, negativeCount }: UserFeedbackProps) => (
  <div className="flex gap-3">
    <div>
      <span>👍</span>
      {positiveCount}
    </div>
    <div>
      <span>👎</span>
      {negativeCount}
    </div>
  </div>
);

interface jobListWithFeedback
  extends Pick<Jobs, "company" | "title" | "blob" | "updatedAt" | "isOpen"> {
  feedbackCount: {
    isOpenCount: number;
    isLegitCount: number;
    isInternationalCount: number;
    isNotOpenCount: number;
    isNotLegitCount: number;
    isNotInternationalCount: number;
  };
}
interface JobListAndPaginationProps {
  jobData: {
    jobList: jobListWithFeedback[];
    totalPages: number;
  };
  queryData: JobListSearchParams;
  isCurator?: true;
}

const JobListAndPagination = ({
  jobData: { jobList, totalPages },
  queryData: { page, title, company, curator, status },
  isCurator,
}: JobListAndPaginationProps) => {
  const tableHeaders = [
    { key: "company", value: "Company" },
    { key: "title", value: "Title" },
    { key: "curatorOpen", value: "Open" },
    { key: "actions", value: "Actions" },
    {
      key: "userIsOpen",
      value: <UserFeedbackHeader content="📋" tooltipText="Is is still open" />,
    },
    {
      key: "userLegitOpen",
      value: <UserFeedbackHeader content="🔎" tooltipText="Is is legit" />,
    },
    {
      key: "userIsInternational",
      value: <UserFeedbackHeader content="🌎" tooltipText="Is is Global" />,
    },
    { key: "lastChange", value: "Last change at" },
  ];
  const dataFormattedForTable = jobList.map(
    ({ title, company, blob, updatedAt, isOpen, feedbackCount }) => ({
      company,
      title,
      curatorOpen: isOpen ? "✅" : "❌",
      actions: <UserActions blob={blob} isCurator={isCurator} />,
      userIsOpen: (
        <UserFeedback
          positiveCount={feedbackCount.isOpenCount}
          negativeCount={feedbackCount.isNotOpenCount}
        />
      ),
      userLegitOpen: (
        <UserFeedback
          positiveCount={feedbackCount.isLegitCount}
          negativeCount={feedbackCount.isNotLegitCount}
        />
      ),
      userIsInternational: (
        <UserFeedback
          positiveCount={feedbackCount.isInternationalCount}
          negativeCount={feedbackCount.isNotInternationalCount}
        />
      ),
      lastChange: updatedAt.toLocaleDateString("en-us"),
    })
  );

  const paramsExceptPage: [string, string | undefined][] = [
    ["company", company],
    ["curator", curator],
    ["status", status],
    ["title", title],
  ];

  return (
    <>
      <Table
        columnHeaders={tableHeaders}
        rows={dataFormattedForTable}
        headerGroups={<HeaderGroup />}
      />
      <Pagination
        totalPages={totalPages}
        page={page ?? "1"}
        paramsExceptPage={paramsExceptPage}
        baseUrl="/job/list"
      />
    </>
  );
};
export default JobListAndPagination;
