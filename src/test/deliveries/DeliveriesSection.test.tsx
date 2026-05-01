import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeliveriesSection } from "@/components/deliveries";

vi.mock("@/hooks/deliveries", () => ({
  useDeliveriesFilters: () => ({
    filters: { page: 1, limit: 20 },
    setStatus: vi.fn(),
  }),
  useDeliveriesQuery: () => ({
    data: {
      data: {
        deliveries: [
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
              title: "Homepage design",
              status: "ACTIVE",
              paymentStatus: "CLIENT_REVIEW",
              deliveryStatus: "CLIENT_REVIEW",
              revisionLimit: 2,
            },
            payment: {
              status: "CLIENT_REVIEW",
              demoMode: true,
            },
            timeline: { agreementId: "agreement-12345678", milestoneId: "mil-1" },
            createdAt: "2026-05-01T09:00:00.000Z",
            updatedAt: "2026-05-01T10:00:00.000Z",
          },
        ],
        page: 1,
        limit: 20,
        total: 1,
      },
    },
    isLoading: false,
    isError: false,
    error: null,
  }),
  useDeliveryDetailsQuery: () => ({
    data: {
      data: {
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
          title: "Homepage design",
          status: "ACTIVE",
          paymentStatus: "CLIENT_REVIEW",
          deliveryStatus: "CLIENT_REVIEW",
          revisionLimit: 2,
        },
        payment: {
          status: "CLIENT_REVIEW",
          demoMode: true,
        },
        timeline: { agreementId: "agreement-12345678", milestoneId: "mil-1" },
        createdAt: "2026-05-01T09:00:00.000Z",
        updatedAt: "2026-05-01T10:00:00.000Z",
      },
    },
  }),
}));

vi.mock("@/hooks/milestones", () => ({
  useMilestoneDetailsQuery: () => ({
    data: {
      data: {
        acceptanceCriteria: [{ description: "تسليم نسخة الموبايل" }],
      },
    },
  }),
}));

describe("DeliveriesSection", () => {
  it("renders the live deliveries title and selected summary", () => {
    render(<DeliveriesSection />);

    expect(screen.getByText("التسليمات")).toBeTruthy();
    expect(screen.getByText("ملخص التسليم المحدد")).toBeTruthy();
    expect(screen.getByText("Homepage design")).toBeTruthy();
  });
});
