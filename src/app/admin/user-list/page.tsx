import { getUserList } from "@/services/dataBaseServives/userServices";

const UserListPage = async () => {
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
