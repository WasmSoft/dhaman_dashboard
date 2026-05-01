import { describe, expect, it } from "vitest";

import {
  buildCreateDeliveryHubHref,
  findFirstDeliveryRouteMatch,
  isMilestoneEligibleForDelivery,
} from "@/lib/deliveries/helpers";
import type { Milestone } from "@/types";

function buildMilestone(overrides: Partial<Milestone> = {}): Milestone {
  return {
    id: overrides.id ?? "mil-1",
    agreementId: overrides.agreementId ?? "agr-1",
    title: overrides.title ?? "Homepage",
    description: overrides.description ?? null,
    amount: overrides.amount ?? "100.00",
    currency: overrides.currency ?? "SAR",
    dueDate: overrides.dueDate ?? null,
    orderIndex: overrides.orderIndex ?? 1,
    status: overrides.status ?? "ACTIVE",
    paymentStatus: overrides.paymentStatus ?? "RESERVED",
    deliveryStatus: overrides.deliveryStatus ?? "NOT_SUBMITTED",
    acceptanceCriteria: overrides.acceptanceCriteria ?? [],
    revisionLimit: overrides.revisionLimit ?? 2,
    createdAt: overrides.createdAt ?? "2026-05-01T09:00:00.000Z",
    updatedAt: overrides.updatedAt ?? "2026-05-01T10:00:00.000Z",
  };
}

describe("delivery-route.helper", () => {
  it("returns the shared create-delivery hub route", () => {
    expect(buildCreateDeliveryHubHref()).toBe("/agreements/delivery");
  });

  it("marks active not-submitted milestones as eligible", () => {
    expect(isMilestoneEligibleForDelivery(buildMilestone())).toBe(true);
  });

  it("rejects milestones that are not in a deliverable status", () => {
    expect(
      isMilestoneEligibleForDelivery(
        buildMilestone({ status: "ACCEPTED", deliveryStatus: "ACCEPTED" }),
      ),
    ).toBe(false);
  });

  it("finds the first eligible active agreement milestone", () => {
    const result = findFirstDeliveryRouteMatch([
      {
        agreementId: "agr-draft",
        agreementStatus: "DRAFT",
        milestones: [buildMilestone({ id: "mil-draft", agreementId: "agr-draft" })],
      },
      {
        agreementId: "agr-active",
        agreementStatus: "ACTIVE",
        milestones: [buildMilestone({ id: "mil-active", agreementId: "agr-active" })],
      },
    ]);

    expect(result).toEqual({ agreementId: "agr-active", milestoneId: "mil-active" });
  });

  it("returns null when no agreement has a deliverable milestone", () => {
    const result = findFirstDeliveryRouteMatch([
      {
        agreementId: "agr-1",
        agreementStatus: "ACTIVE",
        milestones: [
          buildMilestone({ id: "mil-1", deliveryStatus: "ACCEPTED", status: "ACCEPTED" }),
        ],
      },
    ]);

    expect(result).toBeNull();
  });
});
