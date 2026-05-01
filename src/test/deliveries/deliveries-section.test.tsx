import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Delivery, DeliveryListResponse, DeliveryStatus } from "@/types";

import { DeliveriesSection } from "@/components/deliveries/DeliveriesSection";

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

const mockDeliveries: Delivery[] = [
  {
    id: "d1",
    agreementId: "a1",
    milestoneId: "m1",
    agreementTitle: "Landing Page Design",
    milestoneName: "Initial Wireframe",
    summary: "First delivery",
    status: "CLIENT_REVIEW",
    deliveryUrl: "https://example.com/work",
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z",
  },
  {
    id: "d2",
    agreementId: "a2",
    milestoneId: "m2",
    agreementTitle: "Brand Identity",
    milestoneName: "Logo Concepts",
    summary: "Logo concepts",
    status: "DRAFT",
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
    expect(screen.getByText("Landing Page Design")).toBeInTheDocument();
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
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
    const links = screen.getAllByRole("link", { name: /عرض التفاصيل/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute("href", "/deliveries/d1");
    expect(links[1]).toHaveAttribute("href", "/deliveries/d2");
  });
});