import { describe, it, expect } from "vitest";

import { translateDashboardError } from "@/lib/dashboard/helpers/translate-dashboard-error";

import type { DashboardErrorCode } from "@/types/dashboard";

const ALL_ERROR_CODES: DashboardErrorCode[] = [
  "DASHBOARD_RANGE_INVALID",
  "DASHBOARD_AGGREGATION_FAILED",
  "AGREEMENT_NOT_FOUND",
  "VALIDATION_ERROR",
  "UNAUTHORIZED",
];

describe("translateDashboardError", () => {
  it.each(ALL_ERROR_CODES)(
    "returns a non-empty English string for code %s",
    (code) => {
      const result = translateDashboardError(code, "en");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    },
  );

  it.each(ALL_ERROR_CODES)(
    "returns a non-empty Arabic string for code %s",
    (code) => {
      const result = translateDashboardError(code, "ar");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    },
  );

  it.each(ALL_ERROR_CODES)(
    "English and Arabic strings differ for code %s",
    (code) => {
      const en = translateDashboardError(code, "en");
      const ar = translateDashboardError(code, "ar");
      expect(en).not.toBe(ar);
    },
  );
});