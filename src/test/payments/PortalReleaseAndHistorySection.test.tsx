import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/hooks/payments", () => ({
  usePortalPaymentsQuery: () => ({
    data: undefined,
    isLoading: true,
    isError: false,
    error: null,
  }),
  usePortalReleasePaymentMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
  }),
  usePortalPaymentHistoryQuery: () => ({
    rows: [],
    summary: null,
    isLoading: true,
    isError: false,
    error: null,
  }),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("PortalReleasePaymentSection", () => {
  it("shows loading state", async () => {
    const { PortalReleasePaymentSection } = await import(
      "@/components/payments/PortalReleasePaymentSection"
    );

    render(
      <PortalReleasePaymentSection token="tok-1" paymentId="pay-1" />,
      { wrapper: createWrapper() },
    );

    expect(screen.getByText(/تحميل|Loading/i)).toBeTruthy();
  });
});

describe("PortalPaymentHistorySection", () => {
  it("shows loading state", async () => {
    const { PortalPaymentHistorySection } = await import(
      "@/components/payments/PortalPaymentHistorySection"
    );

    render(<PortalPaymentHistorySection token="tok-1" />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText(/تحميل|Loading/i)).toBeTruthy();
  });
});
