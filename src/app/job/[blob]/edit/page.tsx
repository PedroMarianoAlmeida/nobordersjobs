import { getServerSession } from "next-auth";

import PostEditJobForm from "@/components/form/PostEditJobForm";
import { getJopPostByBlob } from "@/services/dataBaseService";
import { getUserNameByEmail } from "@/services/dataBaseServives/userServices";

const EditJobPage = async ({
  params: { blob },
}: {
  params: { blob: string };
}) => {
  const job = await getJopPostByBlob(blob);

  if (!job.success) return <div>Job not found</div>;
  const {
    title,
    company,
    body,
    id,
    isOpen,
    curator: { name: curator },
  } = job.data;

  const session = await getServerSession();

  if (
    !session ||
    session.user === undefined ||
    session.user.email === null ||
    session.user.email === undefined
  )
    return <div>Not authorized</div>;

  const userEmail = await getUserNameByEmail(session.user.email);
  if (userEmail.success === false) return <div>Not authorized</div>;
  const {
    user: { name },
  } = userEmail;

  if (name !== curator) return <div>Not authorized</div>;

  return (
    <main>
      <h1>Edit Job</h1>
      <PostEditJobForm
        initialBody={body}
        initialCompany={company}
        initialTitle={title}
        initialIsOpen={isOpen}
        jobId={id}
      />
    </main>
  );
};

export default EditJobPage;
