import { describe, it, expect } from "vitest";
import { buildPaymentHistoryRows } from "@/lib/payments/helpers/payment-history.helper";
import type { TimelineEvent } from "@/types";

describe("payment-history.helper", () => {
  const mockEvents: TimelineEvent[] = [
    {
      id: "evt-1",
      agreementId: "agr-1",
      milestoneId: null,
      actorRole: "CLIENT",
      type: "PAYMENT_RESERVED",
      title: "Payment Reserved",
      description: "Client funded the payment",
      metadata: {
        paymentId: "pay-1",
        previousStatus: "WAITING",
        newStatus: "RESERVED",
      },
      createdAt: "2026-05-01T08:00:00Z",
    },
    {
      id: "evt-2",
      agreementId: "agr-1",
      milestoneId: null,
      actorRole: "CLIENT",
      type: "PAYMENT_RELEASED",
      title: "Payment Released",
      description: "Client released the payment",
      metadata: {
        paymentId: "pay-1",
        previousStatus: "READY_TO_RELEASE",
        newStatus: "RELEASED",
      },
      createdAt: "2026-05-01T10:00:00Z",
    },
  ];

  it("builds payment history rows in reverse chronological order", () => {
    const rows = buildPaymentHistoryRows(mockEvents, "en");

    expect(rows).toHaveLength(2);
    expect(rows[0].newStatusLabel).toBe("Released");
    expect(rows[1].newStatusLabel).toBe("Reserved");
  });

  it("filters rows by paymentId from metadata", () => {
    const otherEvent: TimelineEvent = {
      ...mockEvents[0],
      id: "evt-3",
      metadata: { ...mockEvents[0].metadata, paymentId: "pay-2" },
    };

    const rows = buildPaymentHistoryRows(
      [...mockEvents, otherEvent],
      "en",
      "pay-1",
    );

    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.eventId !== "evt-3")).toBe(true);
  });

  it("returns label for Arabic locale", () => {
    const rows = buildPaymentHistoryRows(mockEvents, "ar");
    expect(rows[0].newStatusLabel).toBe("تم الإصدار");
    expect(rows[1].newStatusLabel).toBe("محجوزة");
  });
});
