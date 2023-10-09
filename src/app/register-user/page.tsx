import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { getUserNameByEmail } from "@/services/dataBaseService";
import RegisterUserForm from "@/components/RegisterUserForm";

const RegisterUserPage = async () => {
  //TODO: DRY this code (I copied from userNameHandler)
  const session = await getServerSession();
  const email = session?.user?.email;
  let userName;
  if (email !== undefined && email !== null) {
    const dbUserName = await getUserNameByEmail(email);
    if (dbUserName.success) {
      userName = dbUserName.userName;
    }
  }

  if (
    userName !== undefined &&
    userName !== null &&
    email !== null &&
    email !== undefined
  ) {
    redirect("/");
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            You logged but are not in our records. Please register to continue
            (or log out to continue navigating as anonymous).
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <RegisterUserForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
