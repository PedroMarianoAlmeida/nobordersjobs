import { checkUserIsCurator } from "@/services/dataBaseService";
import { redirect } from "next/navigation";
import PostEditJobForm from "@/components/form/PostEditJobForm";

const PostJobPage = async () => {
  const isUserCurator = await checkUserIsCurator();
  if (!isUserCurator.success || !isUserCurator.isCurator) redirect("/");

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
        <PostEditJobForm />
      </div>
    </div>
  );
};

export default PostJobPage;
