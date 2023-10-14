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
    <main className="flex flex-col gap-3 items-center">
      <h1>Job List</h1>
      <JobListTable jobList={jobList} />
      <JobListPagination
        page={page}
        totalPages={totalPages}
        title={title}
        company={company}
        curator={curator}
      />
    </main>
  );
};

export default JobListPage;
