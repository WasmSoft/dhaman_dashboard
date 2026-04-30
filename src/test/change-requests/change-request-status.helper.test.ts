// AR: اختبارات الدوال المساعدة لحالات طلبات التغيير.
// EN: Tests for change request status helper functions.
import { describe, it, expect } from "vitest";
import { getStatusBadgeConfig } from "@/lib/change-requests/helpers";

describe("getStatusBadgeConfig", () => {
  const statuses = [
    "DRAFT",
    "SENT",
    "APPROVED",
    "DECLINED",
    "FUNDED",
    "IN_PROGRESS",
    "DELIVERED",
    "COMPLETED",
  ] as const;

  it.each(statuses)("returns defined config for status %s", (status) => {
    const config = getStatusBadgeConfig(status);
    expect(config).toBeDefined();
    expect(config.label.ar).toBeTruthy();
    expect(config.label.en).toBeTruthy();
    expect(config.colorClass).toBeTruthy();
  });

  it("returns fallback for unknown status value", () => {
    const config = getStatusBadgeConfig("UNKNOWN_STATUS" as never);
    expect(config).toBeDefined();
    expect(config.label.ar).toBe("غير معروف");
    expect(config.label.en).toBe("Unknown");
    expect(config.colorClass).toBeTruthy();
  });

  it("each status returns unique color classes", () => {
    const colors = statuses.map((s) => getStatusBadgeConfig(s).colorClass);
    const uniqueColors = new Set(colors);
    expect(uniqueColors.size).toBe(statuses.length);
  });
});
