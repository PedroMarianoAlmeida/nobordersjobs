"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import {
  DefaultErrorResponse,
  DefaultSuccessResponse,
  defaultErrorSanitizer,
} from "@/types/errorHandler";
import { userSanitizer } from "@/utils/userNameUtils";
import { urlFormatter } from "@/utils/text";

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

export const checkUserIsCurator = async () => {
  const { isValid, userName } = await userSanitizer();
  if (!isValid) return { success: true, isCurator: false };

  try {
    const curator = await prisma.curator.findUnique({
      where: {
        name: userName,
      },
    });

    if (curator === null) return { success: true, isCurator: false };
    return { success: true, isCurator: true, curator };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const promoteUserToCurator = async (userName: string) => {
  try {
    //TODO: Add a validation with the user trying to promote another user is admin (but there is not admin table yet)
    const newCurator = await prisma.curator.create({
      data: {
        name: userName,
      },
    });

    if (newCurator === null) throw new Error("Error inserting new curator");
    return { success: true };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const postNewJob = async (post: {
  title: string;
  jobBody: string;
  company: string;
}) => {
  const { title, jobBody, company } = post;
  const curatorRes = await checkUserIsCurator();
  if (
    !curatorRes.success ||
    !curatorRes.isCurator ||
    curatorRes.curator === undefined
  )
    throw new Error("You are not a curator");

  const blob = urlFormatter(
    `${title} at ${company} by ${curatorRes.curator.name} in ${new Date()
      .toISOString()
      .slice(0, 10)}`
  );
  try {
    const newJob = await prisma.jobs.create({
      data: {
        title,
        company,
        body: jobBody,
        curator: { connect: { name: curatorRes.curator.name } },
        blob,
      },
    });

    if (newJob === null) throw new Error("Error inserting new curator");
    return { success: true, blob };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const getJoppostByBlob = async (blob: string) => {
  try {
    const job = await prisma.jobs.findUnique({
      where: {
        blob,
      },
      include: {
        curator: true,
      },
    });

    if (job === null) throw new Error("No jobpost found");
    return {
      success: true,
      data: job,
    };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
