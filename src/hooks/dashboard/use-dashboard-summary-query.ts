"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardSummaryQueryOptions } from "@/lib/dashboard/actions";

// AR: هذه hook تغلف query الخاصة بملخص لوحة التحكم داخل طبقة hooks الخاصة بالواجهة.
// EN: This hook wraps the dashboard summary query inside the UI-facing hooks layer.
export function useDashboardSummaryQuery() {
  return useQuery(dashboardSummaryQueryOptions());
}
