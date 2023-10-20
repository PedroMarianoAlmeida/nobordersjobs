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

  const users = await getUserList({ page });

  if (!users.success) {
    return <div>Something went wrong</div>;
  }

  return (
    <main className="flex flex-col gap-3 items-center">
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
