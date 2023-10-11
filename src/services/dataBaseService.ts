"use server";

import {
  NoBorderJobsCuratorRow,
  NoBorderJobsJobpostRow,
  NoBorderJobsUserNameRow,
} from "@/types/databaseTypes";
import {
  DefaultErrorResponse,
  DefaultSuccessResponse,
  defaultErrorSanitizer,
} from "@/types/errorHandler";
import { sql } from "@vercel/postgres";
import { userSanitizer } from "@/utils/userNameUtils";
import { urlFormatter } from "@/utils/text";

interface GetUserNameByEmailSuccessResponse extends DefaultSuccessResponse {
  userName: string;
}

export const getUserNameByEmail = async (
  email: string
): Promise<GetUserNameByEmailSuccessResponse | DefaultErrorResponse> => {
  // To do: Encrypt email (to send to database and than here to fetch it)
  try {
    const { rows }: { rows: NoBorderJobsUserNameRow[] } =
      await sql`SELECT username FROM noborderjobsusername WHERE emailencrypted = ${email};`;

    if (rows.length === 0) throw new Error("No user found");

    return { success: true, userName: rows[0].username };
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
    const { rows }: { rows: NoBorderJobsUserNameRow[] } =
      await sql`SELECT username FROM noborderjobsusername WHERE username = ${username};`;

    if (rows.length === 0) return { success: true, exists: false };
    return { success: true, exists: true };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const postNewUserName = async (username: string) => {
  const { email } = await userSanitizer();

  if (!email) throw new Error("Please login to register a new username");
  try {
    const { rowCount }: { rowCount: number } =
      await sql`INSERT INTO NoBorderJobsUserName (emailencrypted, username) VALUES (${email}, ${username});`;

    if (rowCount === 1) return { success: true };
    throw new Error("Error inserting new username");
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const checkUserIsCurator = async () => {
  const { isValid, userName } = await userSanitizer();
  if (!isValid) return { success: true, isCurator: false };

  try {
    const { rows }: { rows: NoBorderJobsCuratorRow[] } =
      await sql`SELECT username FROM no_border_jobs_curators WHERE username = ${userName};`;

    if (rows.length === 0) return { success: true, isCurator: false };
    return { success: true, isCurator: true, userName };
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
  const curator = await checkUserIsCurator();
  if (!curator.success || !curator.isCurator)
    throw new Error("You are not a curator");

  const { userName } = curator;

  const blob = urlFormatter(
    `${title} at ${company} by ${userName} in ${new Date()
      .toISOString()
      .slice(0, 10)}`
  );
  try {
    const { rowCount }: { rowCount: number } =
      await sql`INSERT INTO no_border_jobs_jobspost (title, company, body, username, blob) VALUES (${title}, ${company}, ${jobBody}, ${userName}, ${blob});`;
    if (rowCount === 1) return { success: true, blob };
    throw new Error("Error inserting new jobpost");
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};

export const getJoppostByBlob = async (blob: string) => {
  try {
    const { rows }: { rows: NoBorderJobsJobpostRow[] } =
      await sql`SELECT title, company, body, created_at, updated_at, username FROM no_border_jobs_jobspost WHERE blob = ${blob};`;

    if (rows.length === 0) throw new Error("No jobpost found");
    const { title, company, body, updated_at, username } = rows[0];
    return {
      success: true,
      jobpost: {
        title,
        company,
        body,
        updatedAt: updated_at,
        curator: username,
      },
    };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
