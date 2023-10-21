import Pagination from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import { UserListSearchParams } from "@/types/queryParams";
import ClientActions from "./ClientActions";

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
  const tableHeaders = [
    { key: "name", value: "Name" },
    { key: "createdAt", value: "Created at" },
    { key: "actions", value: "Actions" },
  ];

  const dataFormattedForTable = userList.map(
    ({ name, createdAt, curator }) => ({
      name,
      createdAt: createdAt.toLocaleDateString("en-us"),
      actions: <ClientActions isCurator={curator !== null} name={name} />,
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
