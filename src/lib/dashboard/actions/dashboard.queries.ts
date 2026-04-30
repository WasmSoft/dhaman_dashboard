import { queryOptions } from "@tanstack/react-query";

import {
  getDashboardActionsRequired,
  getDashboardOverview,
  getDashboardRecentActivity,
  getDashboardSummary,
} from "./dashboard.api";
import { dashboardQueryKeys } from "./dashboard.keys";

import type {
  DashboardActionsQuery,
  DashboardOverviewQuery,
  DashboardRecentActivityQuery,
} from "@/types";

// AR: تبني هذه الدالة query options لملخص لوحة التحكم حتى يمكن استخدامها في hooks أو prefetching.
// EN: This function builds dashboard summary query options so they can be reused in hooks or prefetching.
export function dashboardSummaryQueryOptions() {
  return queryOptions({
    queryKey: dashboardQueryKeys.summary(),
    queryFn: getDashboardSummary,
  });
}

// AR: تبني query options لنظرة عامة على لوحة التحكم مع نطاق تاريخ اختياري.
// EN: Builds query options for dashboard overview with an optional date range.
export function dashboardOverviewQueryOptions(query: DashboardOverviewQuery = {}) {
  return queryOptions({
    queryKey: dashboardQueryKeys.overview(query),
    queryFn: () => getDashboardOverview(query),
  });
}

// AR: تبني query options للإجراءات المطلوبة مع تصفية اختيارية.
// EN: Builds query options for actions required with optional filtering.
export function dashboardActionsRequiredQueryOptions(
  query: DashboardActionsQuery = {},
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.actionsRequired(query),
    queryFn: () => getDashboardActionsRequired(query),
  });
}

// AR: تبني query options لأحداث النشاط الأخير مع تصفية اختيارية.
// EN: Builds query options for recent activity events with optional filtering.
export function dashboardRecentActivityQueryOptions(
  query: DashboardRecentActivityQuery = {},
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.recentActivity(query),
    queryFn: () => getDashboardRecentActivity(query),
  });
}
