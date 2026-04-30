"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardActionsRequiredQueryOptions } from "@/lib/dashboard/actions";

import type { DashboardActionsQuery } from "@/types";

// AR: هذه hook تجلب قائمة الإجراءات المطلوبة مع تصفية اختيارية.
// EN: This hook fetches the actions required list with optional filtering.
export function useDashboardActionsRequiredQuery(
  query: DashboardActionsQuery = {},
) {
  return useQuery(dashboardActionsRequiredQueryOptions(query));
}