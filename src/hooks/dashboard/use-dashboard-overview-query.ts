"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardOverviewQueryOptions } from "@/lib/dashboard/actions";

import type { DashboardOverviewQuery } from "@/types";

// AR: هذه hook تجلب بيانات نظرة عامة على لوحة التحكم مع نطاق تاريخ اختياري.
// EN: This hook fetches dashboard overview data with an optional date range.
export function useDashboardOverviewQuery(query: DashboardOverviewQuery = {}) {
  return useQuery(dashboardOverviewQueryOptions(query));
}