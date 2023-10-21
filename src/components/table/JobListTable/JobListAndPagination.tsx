import { Jobs } from "@prisma/client";
import Link from "next/link";

import { JobListSearchParams } from "@/types/queryParams";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";

const UserActions = ({
  blob,
  isCurator,
}: {
  blob: string;
  isCurator?: boolean;
}) => (
  <div className="flex gap-2 flex justify-center">
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
      📋 (Open) / 🔎 (Legit) / 🌎 (International)
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
    <div className="tooltip" data-tip={tooltipText + " (user info)"}>
      {content}
    </div>
  </div>
);

interface UserFeedbackProps {
  positiveCount: number;
  negativeCount: number;
}
const UserFeedback = ({ positiveCount, negativeCount }: UserFeedbackProps) => (
  <div className="flex gap-3 justify-center">
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
    {
      key: "curatorOpen",
      value: (
        <div className="text-center cursor-pointer">
          <div className="tooltip" data-tip="Curator info">
            Open
          </div>
        </div>
      ),
    },
    { key: "actions", value: <div className="text-center">Actions</div> },
    {
      key: "userIsOpen",
      value: <UserFeedbackHeader content="📋" tooltipText="Is it still open" />,
    },
    {
      key: "userLegitOpen",
      value: <UserFeedbackHeader content="🔎" tooltipText="Is it legit" />,
    },
    {
      key: "userIsInternational",
      value: (
        <UserFeedbackHeader content="🌎" tooltipText="Is it really global" />
      ),
    },
    { key: "lastChange", value: "Last change at" },
  ];
  const dataFormattedForTable = jobList.map(
    ({ title, company, blob, updatedAt, isOpen, feedbackCount }) => ({
      company,
      title,
      curatorOpen: <div className="text-center">{isOpen ? "✅" : "❌"}</div>,
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
