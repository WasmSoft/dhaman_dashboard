import { describe, expect, it, vi } from "vitest";

import { axiosInstance } from "@/lib/axios-instance";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("agreement-policies.api", () => {
  it("gets one agreement policy from the agreement policies endpoint", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        id: "pol-1",
        agreementId: "agr-1",
        delayPolicy: null,
        cancellationPolicy: null,
        extraRequestPolicy: null,
        reviewPolicy: null,
        clientReviewPeriodDays: 7,
        freelancerDelayGraceDays: 3,
        createdAt: "2026-05-01T00:00:00.000Z",
        updatedAt: "2026-05-01T00:00:00.000Z",
      },
    });

    const { getAgreementPolicy } = await import(
      "@/lib/agreement-policies/actions/agreement-policies.api"
    );
    const result = await getAgreementPolicy("agr-1");

    expect(result.agreementId).toBe("agr-1");
    expect(mockGet).toHaveBeenCalledWith("/agreements/agr-1/policies");
  });

  it("patches agreement policies with the provided payload", async () => {
    const mockPatch = vi.mocked(axiosInstance.patch);
    mockPatch.mockResolvedValueOnce({
      data: {
        id: "pol-1",
        agreementId: "agr-1",
        delayPolicy: "Updated",
        cancellationPolicy: null,
        extraRequestPolicy: null,
        reviewPolicy: null,
        clientReviewPeriodDays: 7,
        freelancerDelayGraceDays: 3,
        createdAt: "2026-05-01T00:00:00.000Z",
        updatedAt: "2026-05-01T00:00:00.000Z",
      },
    });

    const { upsertAgreementPolicy } = await import(
      "@/lib/agreement-policies/actions/agreement-policies.api"
    );
    const payload = { delayPolicy: "Updated" };
    const result = await upsertAgreementPolicy("agr-1", payload);

    expect(result.delayPolicy).toBe("Updated");
    expect(mockPatch).toHaveBeenCalledWith(
      "/agreements/agr-1/policies",
      payload,
    );
  });
});
