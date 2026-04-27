import type { DashboardContentMap } from "@/types";

export const dashboardContent = {
  dashboard: {
    title: "لوحة التحكم",
    description:
      "هذه صفحة placeholder أساسية للـ admin dashboard، والهدف منها تثبيت architecture قبل إضافة البيانات والمنطق.",
  },
} as const satisfies DashboardContentMap;
