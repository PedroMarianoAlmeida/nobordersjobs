import { checkUserIsCurator } from "@/services/dataBaseService";
import { redirect } from "next/navigation";
import PostJobForm from "./PostJobForm";

const PostJobPage = async () => {
  const isUserCurator = await checkUserIsCurator();
  if (!isUserCurator.success || !isUserCurator.isCurator) redirect("/");

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Post a job!</h1>
          <p className="py-6">
            Thanks for let the world know about this No Borders Job!
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <PostJobForm />
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
