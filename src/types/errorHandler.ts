export interface DefaultErrorResponse {
  success: false;
  message: string;
}

export const defaultErrorSanitizer = (error: any): DefaultErrorResponse => {
  let message = "Unknown Error";
  if (error instanceof Error) message = error.message;
  return { success: false, message };
};

export interface DefaultSuccessResponse {
  success: true;
}
