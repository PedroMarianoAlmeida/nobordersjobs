import { checkUserIsAdmin } from "@/services/dataBaseServices/adminServices";
import { getUserList } from "@/services/dataBaseServices/userServices";

const UserListPage = async () => {
  const getAdmin = await checkUserIsAdmin();

  if (!getAdmin.success || !getAdmin.isAdmin || getAdmin.admin === undefined)
    return <div>Not authorized</div>;


  const userList = await getUserList();

  if (!userList.success) {
    return <div>Something went wrong</div>;
  }
  const {
    data: { jobList, totalPages },
  } = userList;

  console.log({ jobList, totalPages });
  return (
    <main>
      <h1>User List</h1>
    </main>
  );
};

export default UserListPage;
