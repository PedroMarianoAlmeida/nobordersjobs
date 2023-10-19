import JobListAndPagination from "@/components/table/JobListTable/JobListAndPagination";
import JobListForm from "@/components/table/JobListTable/JobListForm";
import { getJobList } from "@/services/dataBaseService";
import { checkUserIsCurator } from "@/services/dataBaseServices/curatorServices";

interface JobListPageProps {
  params: { curatorName: string };
  searchParams: {
    page?: string;
    title?: string;
    company?: string;
  };
}
const CuratorDashboardPage = async ({
  params: { curatorName },
  searchParams: { page, title, company },
}: JobListPageProps) => {
  // This code was copied form edit-description page... put it in a reusable function
  const getCurator = await checkUserIsCurator();

  if (
    !getCurator.success ||
    !getCurator.isCurator ||
    getCurator.curator === undefined
  )
    return <div>Not authorized</div>;
  // -----------------------------
  const {
    curator: { name },
  } = getCurator;

  if (name !== curatorName) return <div>Not authorized</div>;
  const jobs = await getJobList({ curator: name });

  return (
    <main>
      <h1 className="text-center">{curatorName} Job list</h1>

      <JobListForm
        page={page}
        title={title}
        company={company}
        curator={curatorName}
      />

      {jobs.success ? (
        <JobListAndPagination
          jobData={jobs.data}
          queryData={{ page, title, company, curator: curatorName }}
          isCurator
        />
      ) : (
        <h2>No jobs found</h2>
      )}
    </main>
  );
};

export default CuratorDashboardPage;
