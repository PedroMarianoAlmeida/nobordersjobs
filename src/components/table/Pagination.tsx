import Link from "next/link";
import { Fragment } from "react";

interface PaginationProps<T extends string> {
  totalPages: number;
  paramsExceptPage: [string, string | undefined][];
  page: string;
  baseUrl: string;
}

// TODO: Get the query params and replace only the page (to not need to get all, and transform Pagination in a reusable component)
const JobListPagination = ({
  totalPages,
  paramsExceptPage,
  page,
  baseUrl,
}: PaginationProps<string>) => {
  const pageItemsArray = new Array(totalPages).fill(null).map((_, index) => {
    const currentPage = (index + 1).toString();

    const redirectParams = new URLSearchParams();
    redirectParams.append("page", currentPage);
    paramsExceptPage.forEach((param) => {
      if (param[1] !== undefined) redirectParams.append(param[0], param[1]);
    });

    const pageClass = `join-item btn ${
      page === currentPage ? "btn-active" : ""
    }`;

    return {
      key: currentPage,
      component: (
        //TODO: Use new URL object to create the url (but it is much better =D)
        <Link href={baseUrl + "?" + redirectParams}>
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
