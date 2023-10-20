import { checkUserIsAdmin } from "@/services/dataBaseServices/adminServices";
import { getUserList } from "@/services/dataBaseServices/userServices";
import UserListTableAndPagination from "./UserListTableAndPagination";
import { UserListSearchParams } from "@/types/queryParams";

interface UserListPageProps {
  searchParams: UserListSearchParams;
}

const UserListPage = async ({ searchParams: { page } }: UserListPageProps) => {
  const getAdmin = await checkUserIsAdmin();

  if (!getAdmin.success || !getAdmin.isAdmin || getAdmin.admin === undefined)
    return <div>Not authorized</div>;

  const users = await getUserList();

  if (!users.success) {
    return <div>Something went wrong</div>;
  }
  const {
    data: { userList, totalPages },
  } = users;

  console.log({ userList, totalPages });
  return (
    <main>
      <h1>User List</h1>
      {users.success ? (
        <UserListTableAndPagination
          userData={users.data}
          queryData={{ page }}
        />
      ) : (
        <h2>No users found</h2>
      )}
    </main>
  );
};

export default UserListPage;
