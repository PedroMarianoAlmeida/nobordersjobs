import { getServerSession } from "next-auth";
import { getUserNameByEmail } from "@/services/dataBaseService";

export const userNameHandler = async (currentPath: string) => {
  console.log("userNameHandler");
  const session = await getServerSession();

  const email = session?.user?.email;

  let userName;
  if (email !== undefined && email !== null) {
    const dbUserName = await getUserNameByEmail(email);
    if (dbUserName.success) {
      userName = dbUserName.userName;
      // TODO: Add the username in a cookie to be easy to access it
    }
  }

  // Have an user is essential to all logged pages (because I don't want to use email as a key)
  // So if the user is logged, so it is need had an user name (or the user can logout and user as anonymous)
  if (
    userName === undefined &&
    email !== undefined &&
    email !== null &&
    currentPath !== "register-user"
  ) {
    console.log("redirect", { userName, email });
    return { shouldRedirect: true, destination: "/register-user" };
  }

  return { shouldRedirect: false, destination: "" };
};
