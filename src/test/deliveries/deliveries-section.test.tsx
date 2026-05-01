import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { DeliveryListResponse, DeliveryRecordDto, DeliveryStatus } from "@/types";

import { DeliveriesSection } from "@/components/deliveries/DeliveriesSection";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/hooks/deliveries", () => ({
  useDeliveriesQuery: vi.fn(),
  useDeliveryFilters: vi.fn(),
}));

import { useDeliveriesQuery, useDeliveryFilters } from "@/hooks/deliveries";

const mockFilterReturn = {
  agreementId: "",
  setAgreementId: vi.fn(),
  milestoneId: "",
  setMilestoneId: vi.fn(),
  status: "" as "" | DeliveryStatus,
  setStatus: vi.fn(),
  page: 1,
  setPage: vi.fn(),
  limit: 10,
  filters: { agreementId: undefined, milestoneId: undefined, status: undefined, page: 1, limit: 10 },
  resetFilters: vi.fn(),
} as unknown as ReturnType<typeof useDeliveryFilters>;

const mockDeliveries: DeliveryRecordDto[] = [
  {
    id: "d1",
    agreementId: "a1",
    milestoneId: "m1",
    submittedById: "freelancer-1",
    summary: "First delivery",
    status: "CLIENT_REVIEW",
    deliveryUrl: "https://example.com/work",
    milestone: {
      id: "m1",
      title: "Initial Wireframe",
      status: "ACTIVE",
      paymentStatus: "RESERVED",
      deliveryStatus: "CLIENT_REVIEW",
      revisionLimit: 2,
    },
    payment: {
      status: "RESERVED",
      demoMode: true,
      reservedAt: "2026-05-01T08:00:00.000Z",
      releasedAt: null,
    },
    timeline: { agreementId: "a1", milestoneId: "m1" },
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z",
  },
  {
    id: "d2",
    agreementId: "a2",
    milestoneId: "m2",
    submittedById: "freelancer-1",
    summary: "Logo concepts",
    status: "DRAFT",
    milestone: {
      id: "m2",
      title: "Logo Concepts",
      status: "ACTIVE",
      paymentStatus: "WAITING",
      deliveryStatus: "DRAFT",
      revisionLimit: 2,
    },
    payment: null,
    timeline: { agreementId: "a2", milestoneId: "m2" },
    createdAt: "2026-04-28T09:00:00.000Z",
    updatedAt: "2026-04-28T09:00:00.000Z",
  },
];

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("DeliveriesSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    vi.mocked(useDeliveryFilters).mockReturnValue(mockFilterReturn);
    vi.mocked(useDeliveriesQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as ReturnType<typeof useDeliveriesQuery>);
    render(<DeliveriesSection />, { wrapper: createWrapper() });
    expect(screen.getByTestId("deliveries-loading")).toBeInTheDocument();
  });

  it("renders delivery rows when data loads", async () => {
    const mockResponse: DeliveryListResponse = {
      items: mockDeliveries,
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    };
    vi.mocked(useDeliveryFilters).mockReturnValue(mockFilterReturn);
    vi.mocked(useDeliveriesQuery).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useDeliveriesQuery>);
    render(<DeliveriesSection />, { wrapper: createWrapper() });
    expect(screen.getAllByText("اتفاق a1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("اتفاق a2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Initial Wireframe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Logo Concepts").length).toBeGreaterThan(0);
  });

  it("shows empty state when no deliveries exist", () => {
    const mockResponse: DeliveryListResponse = {
      items: [],
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    };
    vi.mocked(useDeliveryFilters).mockReturnValue(mockFilterReturn);
    vi.mocked(useDeliveriesQuery).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useDeliveriesQuery>);
    render(<DeliveriesSection />, { wrapper: createWrapper() });
    expect(screen.getByTestId("deliveries-empty")).toBeInTheDocument();
  });

  it("shows inline error on API failure", () => {
    vi.mocked(useDeliveryFilters).mockReturnValue(mockFilterReturn);
    vi.mocked(useDeliveriesQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("فشل في تحميل التسليمات"),
    } as ReturnType<typeof useDeliveriesQuery>);
    render(<DeliveriesSection />, { wrapper: createWrapper() });
    expect(screen.getByTestId("deliveries-error")).toBeInTheDocument();
  });

  it("links each delivery row to its detail page", async () => {
    const mockResponse: DeliveryListResponse = {
      items: mockDeliveries,
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    };
    vi.mocked(useDeliveryFilters).mockReturnValue(mockFilterReturn);
    vi.mocked(useDeliveriesQuery).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    } as ReturnType<typeof useDeliveriesQuery>);
    render(<DeliveriesSection />, { wrapper: createWrapper() });
    expect(screen.getByRole("link", { name: "عرض التفاصيل" })).toHaveAttribute(
      "href",
      "/deliveries/d1",
    );
    expect(screen.getByRole("link", { name: "متابعة التسليم" })).toHaveAttribute(
      "href",
      "/deliveries/d2",
    );
  });
});
