import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeliveryPreviewSection } from "@/components/client-portal/DeliveryPreviewSection";

const acceptMutateAsync = vi.fn().mockResolvedValue({
  data: { agreementId: "agr-1", status: "ACTIVE", message: "accepted" },
});
const requestChangesMutateAsync = vi.fn();
const openAiReviewMutateAsync = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/hooks/deliveries", () => ({
  usePortalWorkspaceQuery: () => ({
    data: {
      data: {
        agreementId: "agr-1",
        title: "Portal agreement",
        status: "ACTIVE",
        totalAmount: "150.00",
        currency: "USD",
        freelancerName: "Freelancer One",
        milestones: [
          {
            id: "mil-1",
            order: 1,
            title: "Homepage design",
            description: "Milestone description",
            amount: "150.00",
            currency: "USD",
            status: "ACTIVE",
          },
        ],
        payments: [
          {
            milestoneId: "mil-1",
            milestoneTitle: "Homepage design",
            amount: "150.00",
            currency: "USD",
            status: "CLIENT_REVIEW",
          },
        ],
        deliveries: [],
      },
    },
    isLoading: false,
  }),
  usePortalDeliveryDetailsQuery: () => ({
    data: {
      data: {
        id: "del-1",
        milestoneId: "mil-1",
        milestoneTitle: "Homepage design",
        status: "SUBMITTED",
        submittedAt: "2026-05-01T10:00:00.000Z",
        notes: "Please review this version first.",
      },
    },
    isLoading: false,
    isError: false,
  }),
  useAcceptDeliveryMutation: () => ({ isPending: false, mutateAsync: acceptMutateAsync }),
  useRequestDeliveryChangesMutation: () => ({
    isPending: false,
    mutateAsync: requestChangesMutateAsync,
  }),
}));

vi.mock("@/hooks/ai-review", () => ({
  useOpenAiReviewMutation: () => ({ isPending: false, mutateAsync: openAiReviewMutateAsync }),
}));

vi.mock("@/components/client-portal/PortalTimelineEvidence", () => ({
  PortalTimelineEvidence: () => <div>portal-timeline</div>,
}));

describe("DeliveryPreviewSection", () => {
  it("renders a token-required message when route params are missing", () => {
    render(<DeliveryPreviewSection />);

    expect(screen.getByText(/تتطلب رمز بوابة ومعرف تسليم صالحين/)).toBeTruthy();
  });

  it("renders the live portal delivery details and accepts the delivery", async () => {
    render(<DeliveryPreviewSection portalToken="tok-1" deliveryId="del-1" />);

    expect(screen.getByText("Portal agreement")).toBeTruthy();
    expect(screen.getByText("portal-timeline")).toBeTruthy();

    fireEvent.click(screen.getByText("قبول التسليم"));

    expect(acceptMutateAsync).toHaveBeenCalled();
    expect(await screen.findByText("accepted")).toBeTruthy();
  });
});
