"use server";

import { defaultErrorSanitizer } from "@/types/errorHandler";
import { prisma } from "@/utils/prismaClient";
import { userSanitizer } from "@/utils/userNameUtils";

interface GiveFeedbackOnJob {
  jobId: number;
}
export const giveFeedbackOnJob = async ({ jobId }: GiveFeedbackOnJob) => {
  const user = await userSanitizer();
  if (!user.isValid) throw new Error("You are not logged in");
  if (user.userId === null) throw new Error("You are not logged in");

  const { userId } = user;
  // TO DO: Read the feedback on getJopPostByBlob and add interactivity here
  try {
    const feedback = await prisma.userFeedbackOnJobs.upsert({
      where: { userId_jobId: { userId, jobId } },
      update: { isInternational: true, isLegit: false, isOpen: true },
      create: {
        userId: userId,
        jobId: jobId,
        isInternational: true,
        isLegit: false,
        isOpen: true,
      },
    });

    if (feedback === null) throw new Error("Error inserting new feedback");
    return { success: true };

  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
