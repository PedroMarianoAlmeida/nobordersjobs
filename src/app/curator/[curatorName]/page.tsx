import parse from "html-react-parser";

import { getCuratorProfile } from "@/services/dataBaseService";
import Link from "next/link";

const CuratorPage = async ({
  params: { curatorName },
}: {
  params: { curatorName: string };
}) => {
  const res = await getCuratorProfile(curatorName);
  if (!res.success) {
    return <h1>Curator not found</h1>;
  }
  const {
    data: { profile },
  } = res;
  return (
    <main className="flex flex-col gap-2 items-center">
      <h1>
        <b>{curatorName}</b> page
      </h1>
      <div className="card card-compact w-96 bg-base-100 shadow-xl border p-5">
        {parse(profile)}
      </div>

      <Link href={`/job/list?curator=${curatorName}`}>
        <button className="btn btn-primary">See Jobs</button>
      </Link>
    </main>
  );
};

export default CuratorPage;
