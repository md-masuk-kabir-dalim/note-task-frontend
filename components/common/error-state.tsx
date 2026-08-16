"use client";

import ErrorMessage from "@/components/auth/error-message";

export function ErrorState({ message }: { message?: string }) {
  return <ErrorMessage message={message || "Something went wrong"} />;
}
