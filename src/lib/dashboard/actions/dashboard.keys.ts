import type {
  DashboardActionsQuery,
  DashboardOverviewQuery,
  DashboardRecentActivityQuery,
} from "@/types";

// AR: مفاتيح الاستعلام المركزية لوحة التحكم — كل مفتاح يشمل اسم المجموعة والبارامترات.
// EN: Central dashboard query keys — each key includes the group name and parameters.
export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardQueryKeys.all, "summary"] as const,
  overview: (query: DashboardOverviewQuery) =>
    [...dashboardQueryKeys.all, "overview", query] as const,
  actionsRequired: (query: DashboardActionsQuery) =>
    [...dashboardQueryKeys.all, "actions-required", query] as const,
  recentActivity: (query: DashboardRecentActivityQuery) =>
    [...dashboardQueryKeys.all, "recent-activity", query] as const,
} as const;
