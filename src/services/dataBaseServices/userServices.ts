"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import {
  DefaultErrorResponse,
  DefaultSuccessResponse,
  defaultErrorSanitizer,
} from "@/types/errorHandler";
import { userSanitizer } from "@/utils/userNameUtils";
import { ELEMENTS_PER_PAGE } from "@/utils/constants";

export const getUserNameByEmail = async (email: string) => {
  // To do: Encrypt email (to send to database and than here to fetch it)
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user === null) throw new Error("User not found");
    return { success: true, user };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

interface CheckUsernameSuccessResponse extends DefaultSuccessResponse {
  exists: boolean;
}

export const checkUserNameExists = async (
  username: string
): Promise<CheckUsernameSuccessResponse | DefaultErrorResponse> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
    });

    if (user === null) return { success: true, exists: false };
    return { success: true, exists: true };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const postNewUserName = async (username: string) => {
  const { email } = await userSanitizer();

  if (!email) throw new Error("Please login to register a new username");
  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
      },
    });
    if (user !== null) return { success: true };
    throw new Error("Error inserting new username");
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

interface GetUserListProps {
  page?: string;
}
export const getUserList = async (params: GetUserListProps = { page: "1" }) => {
  const { page } = params;
  const pageFormatted = Number(page);

  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        curator: { select: { name: true } },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalUsers = users.length;
    const lastPage = Math.ceil(totalUsers / ELEMENTS_PER_PAGE);

    if (pageFormatted > lastPage) throw new Error("Page not found");

    const initialIndexToBeInReturn = (pageFormatted - 1) * ELEMENTS_PER_PAGE;
    const finalIndexToBeInReturn = initialIndexToBeInReturn + ELEMENTS_PER_PAGE;
    const usersToReturn = [...users].slice(
      initialIndexToBeInReturn,
      finalIndexToBeInReturn
    );

    return {
      success: true,
      data: { userList: usersToReturn, totalPages: lastPage },
    };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
