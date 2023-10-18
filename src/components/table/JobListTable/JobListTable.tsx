import { Jobs } from "@prisma/client";
import Link from "next/link";

const JobListPage = ({
  jobList,
  isCurator,
}: {
  jobList: Jobs[];
  isCurator?: true;
}) => {
  return (
    <div className="overflow-x-auto w-11/12">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Open</th>
            <th>Actions</th>
            <th>Last change at</th>
          </tr>
        </thead>
        <tbody>
          {jobList.map(({ title, company, blob, updatedAt, isOpen }) => (
            <tr key={blob}>
              <td>{company}</td>
              <td>{title}</td>
              <td>{isOpen ? "✅" : "❌"}</td>
              <td className="flex gap-2">
                <Link href={`/job/${blob}`}>
                  <span className="underline">See</span>
                </Link>
                {isCurator && (
                  <Link href={`/job/${blob}/edit`}>
                    <span className="underline">Edit</span>
                  </Link>
                )}
              </td>
              <td>{updatedAt.toLocaleDateString("en-us")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobListPage;
