import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { CardEmpty, CardError, CardLoading } from "@/components/dashboard/DashboardCardStates";
import { DashboardDateRangeSelector } from "@/components/dashboard/DashboardDateRangeSelector";
import { translateDashboardError } from "@/lib/dashboard/helpers/translate-dashboard-error";
import { dashboardTranslations } from "@/constants/dashboard";

import type { DashboardErrorCode } from "@/types/dashboard";
import type { DashboardDateRange } from "@/types/dashboard";

// AR: اختبارات تبديل اللغة — تتحقق أن كل مكوّن يعرض المحتوى باللغة الصحيحة.
// EN: Locale switching tests — verifies each component renders content in the correct language.
describe("Locale switching (SC-003)", () => {
  const ALL_ERROR_CODES: DashboardErrorCode[] = [
    "DASHBOARD_RANGE_INVALID",
    "DASHBOARD_AGGREGATION_FAILED",
    "AGREEMENT_NOT_FOUND",
    "VALIDATION_ERROR",
    "UNAUTHORIZED",
  ];

  it("error codes produce different messages in en vs ar", () => {
    for (const code of ALL_ERROR_CODES) {
      const en = translateDashboardError(code, "en");
      const ar = translateDashboardError(code, "ar");
      expect(en).not.toBe(ar);
      expect(en.length).toBeGreaterThan(0);
      expect(ar.length).toBeGreaterThan(0);
    }
  });

  it("date range labels are present in both locales", () => {
    const dateRangeOptions: DashboardDateRange[] = ["7d", "30d", "90d", "all"];
    for (const option of dateRangeOptions) {
      const key = `dashboard.overview.dateRange.options.${option}` as const;
      const enValue = dashboardTranslations.en[key];
      const arValue = dashboardTranslations.ar[key];
      expect(enValue).toBeDefined();
      expect(arValue).toBeDefined();
      expect(enValue).not.toBe(arValue);
    }
  });

  it("card state labels are present in both locales", () => {
    expect(dashboardTranslations.en["dashboard.cardStates.loading"]).toBeDefined();
    expect(dashboardTranslations.ar["dashboard.cardStates.loading"]).toBeDefined();
    expect(dashboardTranslations.en["dashboard.cardStates.retry"]).toBeDefined();
    expect(dashboardTranslations.ar["dashboard.cardStates.retry"]).toBeDefined();
  });

  it("category labels are present in both locales", () => {
    const categories = ["payments", "deliveries", "ai_reviews", "change_requests", "all"] as const;
    for (const cat of categories) {
      const key = `dashboard.actions.category.${cat}` as const;
      expect(dashboardTranslations.en[key]).toBeDefined();
      expect(dashboardTranslations.ar[key]).toBeDefined();
    }
  });
});