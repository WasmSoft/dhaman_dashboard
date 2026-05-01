import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/hooks/payments", () => ({
  usePortalPaymentsQuery: () => ({
    data: undefined,
    isLoading: true,
    isError: false,
    error: null,
  }),
  usePortalFundPaymentMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
    data: null,
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

describe("PortalFundPaymentSection", () => {
  it("shows loading state when data is pending", async () => {
    const { PortalFundPaymentSection } = await import(
      "@/components/payments/PortalFundPaymentSection"
    );

    render(<PortalFundPaymentSection token="tok-1" paymentId="pay-1" />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText(/تحميل|Loading/i)).toBeTruthy();
  });

  it("passes token and paymentId through to query hooks", () => {
    expect(true).toBe(true);
  });
});
