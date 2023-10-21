"use server";

import { defaultErrorSanitizer } from "@/types/errorHandler";
import { prisma } from "@/utils/prismaClient";
import { userSanitizer } from "@/utils/userNameUtils";

interface GiveFeedbackOnJob {
  jobId: number;
  isOpen?: boolean | null;
  isLegit?: boolean | null;
  isInternational?: boolean | null;
}
export const giveFeedbackOnJob = async ({
  jobId,
  isOpen,
  isLegit,
  isInternational,
}: GiveFeedbackOnJob) => {
  const user = await userSanitizer();
  if (!user.isValid) throw new Error("You are not logged in");
  if (user.userId === null) throw new Error("You are not logged in");

  const { userId } = user;
  try {
    const feedback = await prisma.userFeedbackOnJobs.upsert({
      where: { userId_jobId: { userId, jobId } },
      update: { isInternational, isLegit, isOpen },
      create: {
        userId: userId,
        jobId: jobId,
        isInternational,
        isLegit,
        isOpen,
      },
    });

    if (feedback === null) throw new Error("Error inserting new feedback");
    return { success: true };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
