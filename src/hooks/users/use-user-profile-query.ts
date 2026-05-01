"use client";

import { useQuery } from "@tanstack/react-query";

import { currentUserProfileQueryOptions } from "@/lib/users";

// AR: هذه hook تجلب الملف المهني الحالي لنموذج الإعدادات.
// EN: This hook fetches the current professional profile for the settings form.
export function useUserProfileQuery() {
  return useQuery(currentUserProfileQueryOptions());
}
