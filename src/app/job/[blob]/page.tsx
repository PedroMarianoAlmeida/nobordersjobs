import { getJoppostByBlob } from "@/services/dataBaseService";

const JobDetailPage = async ({
  params: { blob },
}: {
  params: { blob: string };
}) => {
  const job = await getJoppostByBlob(blob);

  if (!job.success) return <div>Job not found</div>;
  const { title, company, body, curator, updatedAt } = job.jobpost;
  console.log({ job });

  return (
    <div>
      <h1>Job Detail Page</h1>
    </div>
  );
};

export default JobDetailPage;
