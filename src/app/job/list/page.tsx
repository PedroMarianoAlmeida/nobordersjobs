import { getJobList } from "@/services/dataBaseService";
import JobListAndPagination from "@/components/table/JobListTable/JobListAndPagination";
import JobListForm from "@/components/table/JobListTable/JobListForm";

export interface JobListSearchParams {
  page?: string;
  title?: string;
  company?: string;
  curator?: string;
  status?: string;
}
interface JobListPageProps {
  searchParams: JobListSearchParams;
}

const JobListPage = async ({ searchParams }: JobListPageProps) => {
  const { page, title, company, curator, status } = searchParams;

  const jobs = await getJobList({ page, title, company, curator, status });

  return (
    <main className="flex flex-col gap-3 items-center">
      <h1>Job List</h1>
      <JobListForm
        page={page}
        title={title}
        company={company}
        curator={curator}
        status={status}
      />

      {jobs.success ? (
        <JobListAndPagination
          jobData={jobs.data}
          queryData={{ page, title, company, curator, status }}
        />
      ) : (
        <h2>No jobs found</h2>
      )}
    </main>
  );
};

export default JobListPage;
