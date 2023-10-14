import { getJobList } from "@/services/dataBaseService";
import JobListTable from "./JobListTable";
import JobListPagination from "./JobListPaginations";

export interface JobListSearchParams {
  page?: string;
  title?: string;
  company?: string;
  curator?: string;
}
interface JobListPageProps {
  searchParams: JobListSearchParams;
}

const JobListPage = async ({ searchParams }: JobListPageProps) => {
  const { page, title, company, curator } = searchParams;
  const jobs = await getJobList({ page, title, company, curator });

  if (!jobs.success) {
    return <h1>Error fetching jobs</h1>;
  }

  const {
    data: { jobList, totalPages },
  } = jobs;

  return (
    <>
      <h1>Job List Page</h1>
      <JobListTable jobList={jobList} />
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

export default JobListPage;
