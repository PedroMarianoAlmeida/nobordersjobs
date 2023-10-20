"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { defaultErrorSanitizer } from "@/types/errorHandler";
import { urlFormatter } from "@/utils/text";
import { ELEMENTS_PER_PAGE } from "@/utils/constants";
import { checkUserIsCurator } from "./curatorServices";
import { JobListSearchParams } from "@/types/queryParams";

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
