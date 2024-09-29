export type StandardResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

const successResponse = <T = unknown>({ data, message }: { data: T, message?: string }): StandardResponse<T> => {
  return {
    success: true,
    data,
    message,
  };
};

const errorResponse = ({ error, message }: { error: string, message?: string }): StandardResponse => {
  return {
    success: false,
    error,
    message,
  };
};

export { successResponse, errorResponse };