import Table from "@/components/table/Table";
import { UserListSearchParams } from "@/types/queryParams";
import { User } from "@prisma/client";

interface UserListTableAndPaginationProps {
  userData: {
    userList: any[]; //The User type need to have the Curator type to works and I don't know how yet
    totalPages: number;
  };
  queryData: UserListSearchParams;
}

const UserListTableAndPagination = ({
  userData,
  queryData: { page },
}: UserListTableAndPaginationProps) => {
  const tableHeaders = ["Name", "Created at"];
  const dataFormattedForTable = userData.userList.map(
    ({ name, createdAt }) => ({
      Name: name,
      "Created at": createdAt.toLocaleDateString("en-us"),
    })
  );

  return (
    <>
      <Table columnHeaders={tableHeaders} rows={dataFormattedForTable} />
    </>
  );
};

export default UserListTableAndPagination;
