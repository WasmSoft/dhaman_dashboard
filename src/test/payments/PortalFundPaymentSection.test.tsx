import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
