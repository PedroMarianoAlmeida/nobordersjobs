import { getJobList } from "@/services/dataBaseService";

export interface JoblistSearchParams {
  page?: string;
  title?: string;
  company?: string;
  curator?: string;
}
interface JobListPageProps {
  searchParams: JoblistSearchParams;
}

const JobListPage = async ({ searchParams }: JobListPageProps) => {
  const { page, title, company, curator } = searchParams;
  const jobs = await getJobList({ page, title, company, curator });
  //console.log({ jobs });
  return (
    <>
      <h1>Job List Page</h1>
    </>
  );
};

export default JobListPage;
