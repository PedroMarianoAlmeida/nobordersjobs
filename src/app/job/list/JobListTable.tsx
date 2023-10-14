import { Jobs } from "@prisma/client";
import Link from "next/link";

const JobListPage = ({
  jobList,
}: {
  jobList: Pick<Jobs, "company" | "title" | "blob" | "updatedAt">[];
}) => {
  return (
    <div className="overflow-x-auto w-11/12">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Company</th>
            <th>Job</th>
            <th>Posted/ Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobList.map(({ title, company, blob, updatedAt }) => (
            <tr key={blob}>
              <td>{company}</td>
              <td>{title}</td>
              <td>{updatedAt.toLocaleDateString("en-us")}</td>
              <td>
                <Link href={`/job/${blob}`}>See details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobListPage;
