import { describe, it, expect, vi } from "vitest";
import { axiosInstance } from "@/lib/axios-instance";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("payments.api — authenticated", () => {
  it("calls getAgreementPayments with the correct agreement ID path", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        data: {
          agreementId: "agr-1",
          currency: "USD",
          payments: [],
          totalFunded: "0",
          totalReleased: "0",
          totalPending: "0",
        },
      },
    });

    const { getAgreementPayments } = await import(
      "@/lib/payments/actions/payments.api"
    );
    const result = await getAgreementPayments("agr-1");

    expect(result.data.agreementId).toBe("agr-1");
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("/agreements/agr-1/payments"),
    );
  });

  it("posts fundMilestone with exact string amount", async () => {
    const mockPost = vi.mocked(axiosInstance.post);
    mockPost.mockResolvedValueOnce({
      data: {
        data: {
          id: "pay-1",
          amount: "100.00",
          status: "RESERVED",
        },
      },
    });

    const { fundMilestone } = await import(
      "@/lib/payments/actions/payments.api"
    );
    const result = await fundMilestone({
      milestoneId: "mil-1",
      amount: "100.00",
    });

    expect(result.data.status).toBe("RESERVED");
    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining("/payments/fund-milestone"),
      expect.objectContaining({ amount: "100.00" }),
    );
  });

  it("gets payment receipt with correct path", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        data: {
          paymentId: "pay-1",
          receiptNumber: "DHM-20260401-ABC123",
          transactionReference: "TXN-xyz",
          amount: "100.00",
          status: "RESERVED",
        },
      },
    });

    const { getPaymentReceipt } = await import(
      "@/lib/payments/actions/payments.api"
    );
    const result = await getPaymentReceipt("pay-1");

    expect(result.data.receiptNumber).toBe("DHM-20260401-ABC123");
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining("/payments/pay-1/receipt"),
    );
  });
});
