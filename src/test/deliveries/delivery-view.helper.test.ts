import { describe, expect, it } from "vitest";

import {
  buildDeliveryMetrics,
  buildDeliverySelectedSummary,
  buildDeliveryTableItems,
} from "@/lib/deliveries";
import type { DeliveryRecordDto } from "@/types";

const sampleDelivery: DeliveryRecordDto = {
  id: "del-1",
  agreementId: "agreement-12345678",
  milestoneId: "mil-1",
  submittedById: "user-1",
  deliveryUrl: "https://example.com/review",
  fileUrl: null,
  fileName: null,
  fileType: null,
  summary: "Valid delivery summary for the milestone.",
  notes: "Please review the first section.",
  status: "CLIENT_REVIEW",
  submittedAt: "2026-05-01T10:00:00.000Z",
  acceptedAt: null,
  changesRequestedAt: null,
  clientFeedback: null,
  milestone: {
    id: "mil-1",
    title: "Homepage design",
    status: "ACTIVE",
    paymentStatus: "CLIENT_REVIEW",
    deliveryStatus: "CLIENT_REVIEW",
    revisionLimit: 2,
  },
  payment: {
    status: "CLIENT_REVIEW",
    demoMode: true,
    reservedAt: null,
    releasedAt: null,
  },
  timeline: {
    agreementId: "agreement-12345678",
    milestoneId: "mil-1",
  },
  createdAt: "2026-05-01T09:00:00.000Z",
  updatedAt: "2026-05-01T10:00:00.000Z",
};

describe("delivery-view.helper", () => {
  it("builds metric cards from delivery statuses", () => {
    const metrics = buildDeliveryMetrics([
      sampleDelivery,
      { ...sampleDelivery, id: "del-2", status: "ACCEPTED" },
    ]);

    expect(metrics).toHaveLength(4);
    expect(metrics[1]?.value).toBe("1");
    expect(metrics[2]?.value).toBe("1");
  });

  it("builds table rows with live action links", () => {
    const rows = buildDeliveryTableItems([sampleDelivery]);

    expect(rows[0]?.actionHref).toContain("/agreements/");
    expect(rows[0]?.detailHref).toContain("/milestones/");
  });

  it("builds the selected summary with milestone criteria", () => {
    const summary = buildDeliverySelectedSummary(sampleDelivery, [
      "تسليم نسخة الموبايل",
    ]);

    expect(summary.criteria).toContain("تسليم نسخة الموبايل");
    expect(summary.status).toBe("مراجعة العميل");
  });
});
