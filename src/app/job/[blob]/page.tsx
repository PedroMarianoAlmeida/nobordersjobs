import parse from "html-react-parser";
import Link from "next/link";

import { getJopPostByBlob } from "@/services/dataBaseService";

const JobDetailPage = async ({
  params: { blob },
}: {
  params: { blob: string };
}) => {
  const job = await getJopPostByBlob(blob);

  if (!job.success) return <div>Job not found</div>;
  const {
    title,
    company,
    body,
    isOpen,
    curator: { name: curator },
  } = job.data;
  const bodyParsed = parse(body);

  return (
    <main className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="flex flex-col bg-base-100 rounded-xl gap-4 p-5 items-center">
          <h1
            className={`text-2xl font-semibold mb-2 text-center ${
              isOpen ? "" : "text-error"
            }`}
          >
            {title}
          </h1>

          <h2 className="text-center">{company}</h2>

          <div className="text-right">
            <span className="text-sm">by </span>
            <Link href={`/curator/${curator}`}>
              <span className="text-primary inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                {curator}
              </span>
            </Link>
          </div>
          {isOpen ? <></> : <h2 className="text-error">Closed Position</h2>}
          <div className="card card-compact w-96 bg-base-100 shadow-xl border p-5">
            {bodyParsed}
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobDetailPage;
