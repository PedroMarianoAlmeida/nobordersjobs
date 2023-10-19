"use server";

import { defaultErrorSanitizer } from "@/types/errorHandler";
import { userSanitizer } from "@/utils/userNameUtils";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export const updateCuratorDescription = async (profile: string) => {
  const { isValid, userName } = await userSanitizer();
  if (!isValid) throw new Error("You are not logged in");

  try {
    const curator = await prisma.curator.update({
      where: {
        name: userName,
      },
      data: {
        profile,
      },
    });

    if (curator === null) throw new Error("Error updating curator");
    return { success: true };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const getCuratorProfile = async (userName: string) => {
  try {
    const curator = await prisma.curator.findUnique({
      where: {
        name: userName,
      },
    });

    if (curator === null) throw new Error("No curator found");
    return { success: true, data: curator };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
