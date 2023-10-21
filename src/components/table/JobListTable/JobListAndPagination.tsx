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
    <th colSpan={3}>
      {/*TODO: Create my own tooltip that accept JSX*/}
      <div
        className="tooltip tooltip-bottom"
        data-tip={
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
      </div>
    </th>
    <th></th>
  </tr>
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
    "Company",
    "Title",
    "Open",
    "Actions",
    "📋",
    "🔎",
    "🌎",
    "Last change at",
  ];
  const dataFormattedForTable = jobList.map(
    ({ title, company, blob, updatedAt, isOpen, feedbackCount }) => ({
      Company: company,
      Title: title,
      Open: isOpen ? "✅" : "❌",
      Actions: <UserActions blob={blob} isCurator={isCurator} />,
      "📋": "",
      "🔎": "",
      "🌎": "",
      "Last change at": updatedAt.toLocaleDateString("en-us"),
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
