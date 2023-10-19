import { getServerSession } from "next-auth";
import { getUserNameByEmail } from "@/services/dataBaseServives/userServices";

interface UserSanitizerSuccess {
  isValid: true;
  email: string;
  userName: string;
}

interface UserSanitizerError {
  isValid: false;
  email: string | null;
  userName: string | null;
}

//With this types, always than isValid is true, the types of email and userName are defined
export const userSanitizer = async (): Promise<
  UserSanitizerSuccess | UserSanitizerError
> => {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (email === undefined || email === null) {
    return { isValid: false, email: null, userName: null };
  }

  const dbUserName = await getUserNameByEmail(email);
  if (dbUserName.success) {
    const userName = dbUserName.user.name;
    return { isValid: true, email, userName };
    // TODO: Add the username in a cookie to be easy to access it
  } else {
    return { isValid: false, email, userName: null };
  }
};

export const userNameHandler = async (currentPath: string) => {
  const { isValid, email } = await userSanitizer();

  // Have an user is essential to all logged pages (because I don't want to use email as a key)
  // So if the user is logged, so it is need had an user name (or the user can logout and user as anonymous)
  if (!isValid && email !== null && currentPath !== "register-user") {
    return { shouldRedirect: true, destination: "/register-user" };
  }

  return { shouldRedirect: false, destination: "" };
};
