import { axiosInstance } from "@/lib/axios-instance";
import { API_PATHS } from "@/lib/api-paths";
import type { DashboardSummaryResponse } from "@/types";

// AR: تجلب هذه الدالة ملخص لوحة التحكم كما يعيده الخادم بدون أي تحويلات view-specific.
// EN: This function fetches the dashboard summary exactly as returned by the backend without view-specific mapping.
export async function getDashboardSummary() {
  const response = await axiosInstance.get<DashboardSummaryResponse>(
    API_PATHS.DASHBOARD.SUMMARY,
  );

  return response.data;
}
