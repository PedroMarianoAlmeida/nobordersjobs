import Link from "next/link";
import { Fragment } from "react";

import { JobListSearchParams } from "@/types/queryParams";

interface JobListPaginationProps extends JobListSearchParams {
  totalPages: number;
}

// TODO: Get the query params and replace only the page (to not need to get all, and transform Pagination in a reusable component)
const JobListPagination = ({
  page,
  title,
  company,
  curator,
  totalPages,
  status,
}: JobListPaginationProps) => {
  const pageItemsArray = new Array(totalPages).fill(null).map((_, index) => {
    const currentPage = (index + 1).toString();
    const pageLink =
      page === currentPage
        ? ""
        : `/job/list?page=${currentPage}${title ? `&title=${title}` : ""}${
            company ? `&company=${company}` : ""
          }${curator ? `&curator=${curator}` : ""}${
            status ? `&status=${status}` : ""
          }`;

    const pageClass = `join-item btn ${
      page === currentPage ? "btn-active" : ""
    }`;

    return {
      key: currentPage,
      component: (
        <Link href={pageLink}>
          <button className={pageClass}>{currentPage}</button>
        </Link>
      ),
    };
  });

  return (
    <div className="join">
      {pageItemsArray.map(({ key, component }) => (
        <Fragment key={key}>{component}</Fragment>
      ))}
    </div>
  );
};

export default JobListPagination;
