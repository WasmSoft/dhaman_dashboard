import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type {
  DashboardActionsRequiredResponse,
  DashboardActionsQuery,
  DashboardOverviewQuery,
  DashboardOverviewResponse,
  DashboardRecentActivityQuery,
  DashboardRecentActivityResponse,
  DashboardSummaryResponse,
} from "@/types";

// AR: تجلب هذه الدالة ملخص لوحة التحكم كما يعيده الخادم بدون أي تحويلات view-specific.
// EN: This function fetches the dashboard summary exactly as returned by the backend without view-specific mapping.
export async function getDashboardSummary() {
  const response = await axiosInstance.get<DashboardSummaryResponse>(
    API_PATHS.DASHBOARD.SUMMARY,
  );

  return response.data;
}

// AR: تجلب هذه الدالة بيانات نظرة عامة على لوحة التحكم مع نطاق تاريخ اختياري.
// EN: This function fetches the dashboard overview data with an optional date range.
export async function getDashboardOverview(query: DashboardOverviewQuery = {}) {
  const response = await axiosInstance.get<DashboardOverviewResponse>(
    API_PATHS.DASHBOARD.OVERVIEW,
    { params: query },
  );

  return response.data;
}

// AR: تجلب هذه الدالة قائمة الإجراءات المطلوبة مع تصفية اختيارية حسب النوع والحد.
// EN: This function fetches the actions required list with optional type filter and limit.
export async function getDashboardActionsRequired(
  query: DashboardActionsQuery = {},
) {
  const response = await axiosInstance.get<DashboardActionsRequiredResponse>(
    API_PATHS.DASHBOARD.ACTIONS_REQUIRED,
    { params: query },
  );

  return response.data;
}

// AR: تجلب هذه الدالة أحداث النشاط الأخير مع تصفية اختيارية حسب الاتفاق والنوع والحد.
// EN: This function fetches recent activity events with optional agreement, type filter, and limit.
export async function getDashboardRecentActivity(
  query: DashboardRecentActivityQuery = {},
) {
  const response = await axiosInstance.get<DashboardRecentActivityResponse>(
    API_PATHS.DASHBOARD.RECENT_ACTIVITY,
    { params: query },
  );

  return response.data;
}
