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
import { JobListSearchParams } from "@/app/job/list/page";
import { ELEMENTS_PER_PAGE } from "@/utils/constants";

//TODO: Separate the dataBase service in small files (one for each table, maybe)

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
        blob,
        curatorId: curatorRes.curator.id,
      },
    });
    if (newJob === null) throw new Error("Error inserting new curator");
    return { success: true, blob };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const editJob = async (post: {
  title: string;
  jobBody: string;
  company: string;
  jobId: number;
  isOpen: boolean;
}) => {
  const { title, jobBody, company, jobId } = post;
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
    const newJob = await prisma.jobs.update({
      where: {
        id: jobId,
      },
      data: {
        title,
        company,
        body: jobBody,
        blob,
        isOpen: post.isOpen,
        updatedAt: new Date(),
      },
    });
    if (newJob === null) throw new Error("Error inserting new curator");
    return { success: true, blob };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const getJopPostByBlob = async (blob: string) => {
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
        curator: true,
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
      data: { jobList: usersToReturn, totalPages: lastPage },
    };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const getJobList = async ({
  page = "1",
  title,
  company,
  curator,
  status,
}: JobListSearchParams) => {
  const pageFormatted = Number(page);

  const possibleStatus = [
    { status: "open", isOpen: true },
    { status: "closed", isOpen: false },
  ];
  const isOpen = possibleStatus.find((s) => s.status === status)?.isOpen;

  try {
    // const totalJobs = await prisma.jobs.count({
    //   where: {
    //     title: { contains: title, mode: "insensitive" },
    //     company: { contains: company, mode: "insensitive" },
    //     curator: { name: { contains: curator, mode: "insensitive" } },
    //   },
    // });

    //TO DO: A better way to pagination, the "skip" should match the criteria of the search
    const jobs = await prisma.jobs.findMany({
      where: {
        title: { contains: title, mode: "insensitive" },
        company: { contains: company, mode: "insensitive" },
        curator: { name: { contains: curator, mode: "insensitive" } },
        isOpen,
      },
      select: {
        company: true,
        title: true,
        blob: true,
        updatedAt: true,
        isOpen: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const totalJobs = jobs.length;
    const lastPage = Math.ceil(totalJobs / ELEMENTS_PER_PAGE);

    if (pageFormatted > lastPage) throw new Error("Page not found");

    const initialIndexToBeInReturn = (pageFormatted - 1) * ELEMENTS_PER_PAGE;
    const finalIndexToBeInReturn = initialIndexToBeInReturn + ELEMENTS_PER_PAGE;
    const jobsToReturn = [...jobs].slice(
      initialIndexToBeInReturn,
      finalIndexToBeInReturn
    );

    return {
      success: true,
      data: { jobList: jobsToReturn, totalPages: lastPage },
    };
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
