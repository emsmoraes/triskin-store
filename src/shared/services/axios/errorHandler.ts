import { AxiosError } from "axios";

export function handleApiError(error: unknown, defaultMessage: string): never {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.detail || defaultMessage);
  }
  throw new Error(defaultMessage);
}
