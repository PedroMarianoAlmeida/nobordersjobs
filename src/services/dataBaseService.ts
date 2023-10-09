"use server";
import { NoBorderJobsUserNameRow } from "@/types/databaseTypes";
import {
  DefaultErrorResponse,
  DefaultSuccessResponse,
  defaultErrorSanitizer,
} from "@/types/errorHandler";
import { sql } from "@vercel/postgres";

interface GetUserNameByEmailSuccessResponse extends DefaultSuccessResponse {
  userName: string;
}

export const getUserNameByEmail = async (
  email: string
): Promise<GetUserNameByEmailSuccessResponse | DefaultErrorResponse> => {
  // To do: Encrypt email (to send to database and than here to fetch it)
  try {
    const { rows }: { rows: NoBorderJobsUserNameRow[] } =
      await sql`SELECT Username FROM noborderjobsusername WHERE Emailencrypted = ${email};`;

    if (rows.length === 0) throw new Error("No user found");
    return { success: true, userName: rows[0].Username };
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
      await sql`SELECT Username FROM noborderjobsusername WHERE Username = ${username};`;

    if (rows.length === 0) return { success: true, exists: false };
    return { success: true, exists: true };
  } catch (error) {
    return defaultErrorSanitizer(error);
  }
};
