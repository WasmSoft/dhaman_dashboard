import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/clients", () => ({
  useClientDetailsQuery: () => ({
    data: {
      id: "cl_1",
      name: "شركة التقنية",
      email: "client@example.com",
      phone: null,
      companyName: null,
      createdAt: "2026-05-01T10:00:00.000Z",
      updatedAt: "2026-05-01T10:00:00.000Z",
    },
    isLoading: false,
    isError: false,
    error: null,
  }),
  useClientSummaryQuery: () => ({
    data: {
      client: {
        id: "cl_1",
        name: "شركة التقنية",
        email: "client@example.com",
        phone: null,
        companyName: null,
        createdAt: "2026-05-01T10:00:00.000Z",
        updatedAt: "2026-05-01T10:00:00.000Z",
      },
      agreements: { total: 0, byStatus: {} },
      payments: { totalAmount: 0, releasedAmount: 0, pendingAmount: 0, currency: "SAR" },
      recentAgreements: [],
    },
    isLoading: false,
    isError: false,
    error: null,
  }),
  useUpdateClientMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

describe("ClientProfileSection", () => {
  it("renders client data and summary cards", async () => {
    const { ClientProfileSection } = await import("@/components/clients");

    render(<ClientProfileSection clientId="cl_1" />);

    expect(screen.getByText("شركة التقنية")).toBeInTheDocument();
    expect(screen.getByText(/إجمالي الاتفاقات/)).toBeInTheDocument();
  });
});
