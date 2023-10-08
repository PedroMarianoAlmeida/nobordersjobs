import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export const userNameHandler = async (currentPath: string) => {
  const cookieStore = cookies();
  const session = await getServerSession();
  const userName = cookieStore.get("userName");

  const email = session?.user?.email;
  //Have an user is essential to all logged pages (because I don't want to use email as a key)
  if (!userName && email && currentPath !== "register-user") {
    return { shouldRedirect: true, destination: "/register-user" };
  }

  return { shouldRedirect: false, destination: "" };
};
