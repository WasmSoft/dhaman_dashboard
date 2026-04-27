"use client";

import { useQuery } from "@tanstack/react-query";

import { currentUserQueryOptions } from "@/lib/auth/actions";

// AR: هذه hook تغلف current-user query options داخل طبقة hooks الخاصة بالمصادقة.
// EN: This hook wraps the current-user query options inside the auth hooks layer.
export function useCurrentUserQuery() {
  return useQuery(currentUserQueryOptions());
}
