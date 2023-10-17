import { Jobs } from "@prisma/client";

import JobListPagination from "./JobListPaginations";
import JobListTable from "@/components/table/JobListTable/JobListTable";
import { JobListSearchParams } from "../../../app/job/list/page";

interface JobListAndPaginationProps {
  jobData: {
    jobList: Pick<Jobs, "company" | "title" | "blob" | "updatedAt">[];
    totalPages: number;
  };
  queryData: JobListSearchParams;
  isCurator?: true;
}

const JobListAndPagination = ({
  jobData: { jobList, totalPages },
  queryData: { page, title, company, curator },
  isCurator,
}: JobListAndPaginationProps) => {
  return (
    <>
      <JobListTable jobList={jobList} isCurator={isCurator} />
      <JobListPagination
        page={page}
        totalPages={totalPages}
        title={title}
        company={company}
        curator={curator}
      />
    </>
  );
};
export default JobListAndPagination;