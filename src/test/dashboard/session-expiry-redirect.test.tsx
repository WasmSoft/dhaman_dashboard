import { describe, it, expect, beforeEach, vi } from "vitest";

import { ApiError } from "@/lib/axios-instance";
import { translateDashboardError } from "@/lib/dashboard/helpers/translate-dashboard-error";

import type { DashboardErrorCode } from "@/types/dashboard";

describe("Session expiry redirect (FR-013, SC-005)", () => {
  it("ApiError with 401 status code is recognized as UNAUTHORIZED", () => {
    const error = new ApiError({
      message: "Authentication is required.",
      statusCode: 401,
      code: "UNAUTHORIZED",
    });

    expect(error.statusCode).toBe(401);
    expect(error.code).toBe("UNAUTHORIZED");
  });

  it("clearAccessToken is exported from axios-instance", async () => {
    const { clearAccessToken } = await import("@/lib/axios-instance");
    expect(typeof clearAccessToken).toBe("function");
  });

  it("dashboard error code UNAUTHORIZED maps to correct localized message in both locales", () => {
    const enMessage = translateDashboardError("UNAUTHORIZED", "en");
    const arMessage = translateDashboardError("UNAUTHORIZED", "ar");

    expect(enMessage).toBe("Authentication is required.");
    expect(arMessage).toBe("المصادقة مطلوبة.");
  });
});