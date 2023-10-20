import { Jobs } from "@prisma/client";
import Link from "next/link";

import { JobListSearchParams } from "@/types/queryParams";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";

interface JobListAndPaginationProps {
  jobData: {
    jobList: Pick<
      Jobs,
      "company" | "title" | "blob" | "updatedAt" | "isOpen"
    >[];
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
    "Last change at",
  ];
  const dataFormattedForTable = jobList.map(
    ({ title, company, blob, updatedAt, isOpen }) => ({
      Company: company,
      Title: title,
      Open: isOpen ? "✅" : "❌",
      Actions: (
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
      ),
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
      <Table columnHeaders={tableHeaders} rows={dataFormattedForTable} />
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
