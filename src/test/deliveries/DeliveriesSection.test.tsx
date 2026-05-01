import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeliveriesSection } from "@/components/deliveries";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/hooks/deliveries", () => ({
  useDeliveryFilters: () => ({
    agreementId: "",
    setAgreementId: vi.fn(),
    milestoneId: "",
    setMilestoneId: vi.fn(),
    status: "",
    setStatus: vi.fn(),
    page: 1,
    setPage: vi.fn(),
    limit: 10,
    filters: { agreementId: undefined, milestoneId: undefined, status: undefined, page: 1, limit: 10 },
    resetFilters: vi.fn(),
  }),
  useDeliveriesQuery: () => ({
    data: {
      items: [
        {
          id: "del-1",
          agreementId: "agreement-12345678",
          milestoneId: "mil-1",
          submittedById: "user-1",
          summary: "Valid delivery summary for the milestone.",
          status: "CLIENT_REVIEW",
          deliveryUrl: "https://example.com/review",
          fileUrl: null,
          fileName: null,
          fileType: null,
          notes: "Please review this first.",
          submittedAt: "2026-05-01T10:00:00.000Z",
          acceptedAt: null,
          changesRequestedAt: null,
          clientFeedback: null,
          milestone: {
            id: "mil-1",
            title: "Mobile layout",
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
        },
      ],
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
    },
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

describe("DeliveriesSection", () => {
  it("renders the deliveries table and summary shell", () => {
    render(<DeliveriesSection />);

    expect(screen.getByText("التسليمات")).toBeTruthy();
    expect(screen.getByText("ملخص التسليم الحالي")).toBeTruthy();
    expect(screen.getAllByText("Mobile layout").length).toBeGreaterThan(0);
  });
});
