import { NoBorderJobsUserNameRow } from "@/types/databaseTypes";
import { sql } from "@vercel/postgres";

interface GetUserNameByEmailSuccessResponse {
  success: true;
  userName: string;
}

interface GetUserNameByEmailFailureResponse {
  success: false;
  message: string;
}

type GetUserNameByEmailResponse =
  | GetUserNameByEmailSuccessResponse
  | GetUserNameByEmailFailureResponse;

export const getUserNameByEmail = async (
  email: string
): Promise<GetUserNameByEmailResponse> => {
  // To do: Encrypt email (to send to database and than here to fetch it)
  try {
    const { rows }: { rows: NoBorderJobsUserNameRow[] } =
      await sql`SELECT Username FROM noborderjobsusername WHERE Emailencrypted = ${email};`;

    if (rows.length === 0) throw new Error("No user found");
    return { success: true, userName: rows[0].Username };
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;

    return { success: false, message };
  }
};
