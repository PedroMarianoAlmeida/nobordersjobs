import Pagination from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import { UserListSearchParams } from "@/types/queryParams";

interface UserWithCurator {
  name: string;
  createdAt: Date;
  curator: {
    name: string;
  } | null;
}
interface UserListTableAndPaginationProps {
  userData: {
    userList: UserWithCurator[];
    totalPages: number;
  };
  queryData: UserListSearchParams;
}

const UserListTableAndPagination = ({
  userData: { userList, totalPages },
  queryData: { page },
}: UserListTableAndPaginationProps) => {
  const tableHeaders = ["Name", "Created at", "Actions"];
  const dataFormattedForTable = userList.map(
    ({ name, createdAt, curator }) => ({
      Name: name,
      "Created at": createdAt.toLocaleDateString("en-us"),
      Actions: curator ? (
        <button className="btn btn-error">Remove curator access </button>
      ) : (
        <button className="btn btn-info">Add curator access</button>
      ),
    })
  );

  return (
    <>
      <Table columnHeaders={tableHeaders} rows={dataFormattedForTable} />
      <Pagination
        totalPages={totalPages}
        page={page ?? "1"}
        paramsExceptPage={[]}
        baseUrl="/admin/user-list"
      />
    </>
  );
};

export default UserListTableAndPagination;
