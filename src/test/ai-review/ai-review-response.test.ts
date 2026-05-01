import { describe, expect, it } from "vitest";

import {
  resolveAiReviewDetailResponse,
  resolveAiReviewsListResponse,
} from "@/lib/ai-review/helpers";

const sampleReview = {
  id: "rev-1",
  agreementId: "agr-1",
  milestoneId: "mil-1",
  deliveryId: "del-1",
  status: "PENDING",
  matchScore: 87,
  recommendation: null,
  reasoning: null,
  completedCriteria: [],
  missingCriteria: [],
  outOfScopeItems: [],
  objection: "Need another revision",
  requestedByRole: "CLIENT",
  createdAt: "2026-05-01T09:00:00.000Z",
  updatedAt: "2026-05-01T10:00:00.000Z",
} as const;

describe("ai-review response helpers", () => {
  it("normalizes direct list responses", () => {
    const result = resolveAiReviewsListResponse({ reviews: [sampleReview], total: 1 });

    expect(result.reviews).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it("normalizes data-wrapped list responses", () => {
    const result = resolveAiReviewsListResponse({
      data: { reviews: [sampleReview], total: 1 },
    });

    expect(result.reviews[0]?.id).toBe("rev-1");
  });

  it("normalizes direct detail responses", () => {
    const result = resolveAiReviewDetailResponse(sampleReview);

    expect(result?.data.id).toBe("rev-1");
  });

  it("normalizes nested detail responses", () => {
    const result = resolveAiReviewDetailResponse({ data: { data: sampleReview } });

    expect(result?.data.id).toBe("rev-1");
  });
});
