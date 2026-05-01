import { describe, expect, it } from "vitest";

import { resolveDeliveryListResponse } from "@/lib/deliveries/helpers";

const sampleDelivery = {
  id: "del-1",
  agreementId: "agr-1",
  milestoneId: "mil-1",
  submittedById: "user-1",
  summary: "Valid delivery summary",
  status: "DRAFT",
  deliveryUrl: "https://example.com/review",
  fileUrl: null,
  fileName: null,
  fileType: null,
  notes: null,
  submittedAt: null,
  acceptedAt: null,
  changesRequestedAt: null,
  clientFeedback: null,
  milestone: {
    id: "mil-1",
    title: "Mobile layout",
    status: "ACTIVE",
    paymentStatus: "RESERVED",
    deliveryStatus: "DRAFT",
    revisionLimit: 2,
  },
  payment: null,
  timeline: {
    agreementId: "agr-1",
    milestoneId: "mil-1",
  },
  createdAt: "2026-05-01T09:00:00.000Z",
  updatedAt: "2026-05-01T10:00:00.000Z",
};

describe("resolveDeliveryListResponse", () => {
  it("keeps the direct items response shape", () => {
    const result = resolveDeliveryListResponse({
      items: [sampleDelivery],
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.id).toBe("del-1");
  });

  it("unwraps backend data.deliveries responses", () => {
    const result = resolveDeliveryListResponse({
      data: { deliveries: [sampleDelivery], page: 1, limit: 20, total: 1 },
    });

    expect(result.items).toHaveLength(1);
    expect(result.limit).toBe(20);
    expect(result.total).toBe(1);
  });
});
