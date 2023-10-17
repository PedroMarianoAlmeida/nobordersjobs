import { checkUserIsCurator, getJobList } from "@/services/dataBaseService";
import { redirect } from "next/navigation";

const CuratorDashboardPage = async ({
  params: { curatorName },
}: {
  params: { curatorName: string };
}) => {
  // This code was copied form edit-description page... put it in a reusable function
  const getCurator = await checkUserIsCurator();

  if (
    !getCurator.success ||
    !getCurator.isCurator ||
    getCurator.curator === undefined
  )
    redirect("/");
  // -----------------------------
  const {
    curator: { name },
  } = getCurator;

  if (name !== curatorName) redirect("/"); //Here is validated if the user is the same of the url

  const jobs = await getJobList({ curator: name });
  console.log(jobs);

  return (
    <main>
      <h1>{curatorName} Dashboard</h1>
    </main>
  );
};

export default CuratorDashboardPage;
