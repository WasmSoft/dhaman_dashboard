"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardRecentActivityQueryOptions } from "@/lib/dashboard/actions";

import type { DashboardRecentActivityQuery } from "@/types";

// AR: هذه hook تجلب أحداث النشاط الأخيرة مع تصفية اختيارية وحد افتراضي 5 أحداث.
// EN: This hook fetches recent activity events with optional filtering and a default limit of 5 events.
export function useDashboardRecentActivityQuery(
  query: DashboardRecentActivityQuery = {},
) {
  return useQuery(
    dashboardRecentActivityQueryOptions({
      limit: 5,
      ...query,
    }),
  );
}