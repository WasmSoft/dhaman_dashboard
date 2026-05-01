import { describe, expect, it } from "vitest";

import { resolveMilestoneDetail } from "@/lib/milestones";
import type { Milestone } from "@/types";

function buildMilestone(): Milestone {
  return {
    id: "mil-1",
    agreementId: "agr-1",
    title: "Homepage design",
    description: null,
    amount: "150.00",
    currency: "SAR",
    dueDate: null,
    orderIndex: 1,
    status: "ACTIVE",
    paymentStatus: "RESERVED",
    deliveryStatus: "DRAFT",
    acceptanceCriteria: [{ description: "Wireframe delivered" }],
    revisionLimit: 2,
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z",
  };
}

describe("resolveMilestoneDetail", () => {
  it("returns a direct milestone payload", () => {
    const milestone = buildMilestone();

    expect(resolveMilestoneDetail(milestone)).toEqual(milestone);
  });

  it("unwraps a standard data envelope", () => {
    const milestone = buildMilestone();

    expect(resolveMilestoneDetail({ data: milestone })).toEqual(milestone);
  });

  it("unwraps nested data envelopes", () => {
    const milestone = buildMilestone();

    expect(resolveMilestoneDetail({ success: true, data: { data: milestone } })).toEqual(milestone);
  });

  it("returns null for an invalid payload", () => {
    expect(resolveMilestoneDetail({ data: { total: 1 } })).toBeNull();
  });
});
