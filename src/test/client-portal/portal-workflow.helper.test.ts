import { describe, expect, it } from "vitest";

import {
  getFirstFundablePortalPaymentId,
  getFirstReleasablePortalPaymentId,
  getPortalDeliveryPreviewId,
} from "@/lib/client-portal/helpers";
import type { PortalPaymentPlanResponse, PortalWorkspaceResponseDto } from "@/types";

const paymentPlan: PortalPaymentPlanResponse = {
  agreementId: "agr-1",
  payments: [
    {
      id: "pay-released",
      amount: "100",
      currency: "SAR",
      status: "RELEASED",
      milestoneTitle: "Done",
      receiptNumber: null,
    },
    {
      id: "pay-waiting",
      amount: "200",
      currency: "SAR",
      status: "WAITING",
      milestoneTitle: "First",
      receiptNumber: null,
    },
    {
      id: "pay-ready",
      amount: "300",
      currency: "SAR",
      status: "READY_TO_RELEASE",
      milestoneTitle: "Second",
      receiptNumber: null,
    },
  ],
  currency: "SAR",
  totalAmount: "600",
  fundedAmount: "100",
  pendingAmount: "500",
};

const workspace: PortalWorkspaceResponseDto = {
  agreementId: "agr-1",
  title: "Project",
  status: "ACTIVE",
  totalAmount: "600",
  currency: "SAR",
  freelancerName: "Freelancer",
  milestones: [],
  payments: [],
  deliveries: [
    {
      id: "del-old",
      milestoneId: "mil-1",
      milestoneTitle: "Old",
      status: "ACCEPTED",
      submittedAt: "2026-04-29T10:00:00.000Z",
    },
    {
      id: "del-review",
      milestoneId: "mil-2",
      milestoneTitle: "Review",
      status: "SUBMITTED",
      submittedAt: "2026-05-01T10:00:00.000Z",
    },
  ],
};

describe("portal-workflow.helper", () => {
  it("selects the first fundable payment", () => {
    expect(getFirstFundablePortalPaymentId(paymentPlan)).toBe("pay-waiting");
  });

  it("selects the first releasable payment", () => {
    expect(getFirstReleasablePortalPaymentId(paymentPlan)).toBe("pay-ready");
  });

  it("selects the latest reviewable delivery", () => {
    expect(getPortalDeliveryPreviewId(workspace)).toBe("del-review");
  });
});
