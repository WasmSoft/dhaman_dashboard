import { describe, it, expect, vi } from "vitest";
import { axiosInstance } from "@/lib/axios-instance";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    request: vi.fn(),
  },
}));

describe("payments.api — portal", () => {
  it("calls getPortalPayments with the correct token path", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        data: {
          agreementId: "agr-1",
          payments: [],
          currency: "USD",
          totalAmount: "0",
          fundedAmount: "0",
          pendingAmount: "0",
        },
      },
    });

    const { getPortalPayments } = await import(
      "@/lib/payments/actions/payments.api"
    );
    const result = await getPortalPayments("tok-abc");

    expect(result.data.agreementId).toBe("agr-1");
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("/portal/tok-abc/payments"),
    );
  });

  it("posts fundPaymentFromPortal with explicit POST and amount body", async () => {
    const mockRequest = vi.mocked(axiosInstance.request);
    mockRequest.mockResolvedValueOnce({
      data: {
        data: { id: "pay-1", amount: "100.00", status: "RESERVED" },
      },
    });

    const { fundPaymentFromPortal } = await import(
      "@/lib/payments/actions/payments.api"
    );
    const result = await fundPaymentFromPortal("tok-abc", "pay-1", {
      amount: "100.00",
    });

    expect(result.data.status).toBe("RESERVED");
    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      url: expect.stringContaining("/portal/tok-abc/payments/pay-1/fund"),
      data: { amount: "100.00" },
    });
  });
});
