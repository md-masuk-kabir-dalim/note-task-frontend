/* eslint-disable */
import { envConfig } from "@/helper/envConfig";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearClientAuthCookies } from "@/lib/auth-session";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseApi,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("x-api-key", envConfig.api_key);
    return headers;
  },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      // Attempt refresh token
      const refreshResponse = await fetch(
        `${envConfig.baseApi}/api/v1/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": envConfig.api_key,
          },
          credentials: "include",
        }
      );

      const data = await refreshResponse.json();

      if (data?.success) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        cleanupAuth();
      }
    } catch {
      cleanupAuth();
    }
  }

  // Customize network errors
  if (
    result.error?.status === "FETCH_ERROR" &&
    typeof result.error.error === "string" &&
    result.error.error.includes("NetworkError")
  ) {
    result.error.error =
      "Server connection failed. Please check your internet or try again later.";
  }

  return result;
};

// Cleanup function: remove cookies and Redux user
function cleanupAuth() {
  clearClientAuthCookies();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
