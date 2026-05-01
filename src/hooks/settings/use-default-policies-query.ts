"use client";

import { useQuery } from "@tanstack/react-query";

import { defaultPoliciesQueryOptions } from "@/lib/settings/actions";

// AR: هوك لجلب السياسات الافتراضية داخل صفحة الإعدادات.
// EN: Hook for fetching default policies inside the settings page.
export function useDefaultPoliciesQuery() {
  return useQuery(defaultPoliciesQueryOptions());
}
