"use client";

import { PortalErrorSection } from "@/components/client-portal";
import { ApiError } from "@/lib/axios-instance";

export default function ClientPortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; code?: string };
  reset: () => void;
}) {
  const errorCode =
    error instanceof ApiError
      ? error.code
      : ((error as { code?: string })?.code ?? undefined);

  return (
    <PortalErrorSection
      errorCode={errorCode}
      message={error.message}
      onReset={reset}
    />
  );
}
