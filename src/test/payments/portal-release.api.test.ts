import { describe, it, expect, vi } from "vitest";
import { axiosInstance } from "@/lib/axios-instance";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("payments.api — portal release and history", () => {
  it("calls getPortalPaymentHistory with token", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        data: {
          events: [],
          summary: { totalFunded: "0", totalReleased: "0", currency: "USD" },
        },
      },
    });

    const { getPortalPaymentHistory } = await import(
      "@/lib/payments/actions/payments.api"
    );
    const result = await getPortalPaymentHistory("tok-release");

    expect(result.data.summary.currency).toBe("USD");
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("/portal/tok-release/payment-history"),
    );
  });

  it("posts confirmReleaseFromPortal with correct params", async () => {
    const mockPost = vi.mocked(axiosInstance.post);
    mockPost.mockResolvedValueOnce({
      data: {
        data: { id: "pay-1", status: "RELEASED", releasedAt: "2026-05-01T10:00:00Z" },
      },
    });

    const { confirmReleaseFromPortal } = await import(
      "@/lib/payments/actions/payments.api"
    );
    const result = await confirmReleaseFromPortal("tok-r", "pay-1", {
      confirmed: true,
    });

    expect(result.data.status).toBe("RELEASED");
    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining("/portal/tok-r/payments/pay-1/release"),
      expect.objectContaining({ confirmed: true }),
    );
  });
});
