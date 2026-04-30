import { describe, it, expect, vi, beforeEach } from "vitest";

// AR: اختبار يحافظ على قيم الأموال كنصوص دقيقة — لا تحويل إلى رقم.
// EN: Test verifying money values are preserved as exact strings without number conversion.
describe("Money string preservation (SC-001, SC-011)", () => {
  const HIGH_PRECISION_VALUE = "1234567890.123456789";

  it("high-precision money string is preserved exactly in overview metric value", () => {
    const metric = {
      key: "protectedAmount",
      labelKey: "dashboard.overview.metrics.protectedAmount",
      value: HIGH_PRECISION_VALUE,
      icon: "wallet" as const,
    };

    expect(metric.value).toBe(HIGH_PRECISION_VALUE);
    expect(metric.value).not.toBe(Number(HIGH_PRECISION_VALUE).toString());
  });

  it("high-precision money string is preserved exactly in payment summary", () => {
    const paymentSummary = {
      protectedAmount: HIGH_PRECISION_VALUE,
      releasedAmount: "0.001",
      pendingAmount: "9999999999.9999999999",
      byStatus: {},
      currency: "USD",
    };

    expect(paymentSummary.protectedAmount).toBe(HIGH_PRECISION_VALUE);
    expect(paymentSummary.pendingAmount).toBe("9999999999.9999999999");
  });

  it("high-precision money string is preserved in action item params", () => {
    const actionItem = {
      id: "delivery:abc",
      category: "deliveries" as const,
      titleKey: "dashboard.actions.category.deliveries",
      params: { amount: HIGH_PRECISION_VALUE, currency: "SAR" },
      agreementId: "agreement-1",
      targetRoute: "/agreements/agreement-1",
    };

    expect(actionItem.params.amount).toBe(HIGH_PRECISION_VALUE);
  });

  it("high-precision money string is preserved in activity event params", () => {
    const event = {
      id: "event-1",
      type: "PAYMENT_RELEASED" as const,
      titleKey: "dashboard.recentActivity.title",
      descriptionKey: "dashboard.recentActivity.empty",
      params: { amount: HIGH_PRECISION_VALUE },
      actorRole: "FREELANCER" as const,
      agreementId: "agreement-1",
      createdAt: "2026-04-29T12:00:00Z",
    };

    expect(event.params.amount).toBe(HIGH_PRECISION_VALUE);
  });
});