type ApiErrorShape = {
  data?: {
    message?: string;
    errors?: {
      retryAfterSeconds?: number;
    };
  };
  message?: string;
};

export function getApiError(err: unknown): ApiErrorShape {
  if (!err || typeof err !== "object") return {};
  return err as ApiErrorShape;
}

export function getApiErrorMessage(
  err: unknown,
  fallback = "Something went wrong"
): string {
  const parsed = getApiError(err);
  return parsed.data?.message || parsed.message || fallback;
}
