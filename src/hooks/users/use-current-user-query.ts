"use client";

import { useQuery } from "@tanstack/react-query";

import { currentUserQueryOptions } from "@/lib/users";

// AR: هذه hook تجلب بيانات الحساب الحالية لاستخدامها في الصفحة والهيدر.
// EN: This hook fetches the current account data for the page and header.
export function useCurrentUserQuery() {
  return useQuery(currentUserQueryOptions());
}
