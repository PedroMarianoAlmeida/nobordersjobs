"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { defaultErrorSanitizer } from "@/types/errorHandler";
import { userSanitizer } from "@/utils/userNameUtils";

// I will keep here but I don't think I will use it (but I create to insert my first admin)
const promoteUserToAdmin = async (userName: string) => {
  try {
    const newCurator = await prisma.admin.create({
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

export const checkUserIsAdmin = async () => {
  const { isValid, userName } = await userSanitizer();
  if (!isValid) return { success: true, isAdmin: false };

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        name: userName,
      },
    });

    if (admin === null) return { success: true, isAdmin: false };
    return { success: true, isAdmin: true, admin };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
