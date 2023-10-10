import { checkUserIsCurator } from "@/services/dataBaseService";
import { userSanitizer } from "@/utils/userNameUtils";
import { redirect } from "next/navigation";

const PostJobPage = async () => {
  const isUserCurator = await checkUserIsCurator();
  if (!isUserCurator.success || !isUserCurator.isCurator) redirect("/");

  return (
    <>
      <h2>Post Job Page</h2>
    </>
  );
};

export default PostJobPage;
