import { describe, expect, it, vi } from "vitest";

import { axiosInstance } from "@/lib/axios-instance";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("settings.api", () => {
  it("gets default policies from the settings endpoint", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        delayPolicy: null,
        cancellationPolicy: null,
        extraRequestPolicy: null,
        reviewPolicy: null,
        clientReviewPeriodDays: 7,
        freelancerDelayGraceDays: 3,
      },
    });

    const { getDefaultPolicies } = await import(
      "@/lib/settings/actions/settings.api"
    );
    const result = await getDefaultPolicies();

    expect(result.clientReviewPeriodDays).toBe(7);
    expect(mockGet).toHaveBeenCalledWith("/settings/default-policies");
  });

  it("patches default policies to the settings endpoint", async () => {
    const mockPatch = vi.mocked(axiosInstance.patch);
    mockPatch.mockResolvedValueOnce({
      data: {
        delayPolicy: "Updated",
        cancellationPolicy: null,
        extraRequestPolicy: null,
        reviewPolicy: null,
        clientReviewPeriodDays: 7,
        freelancerDelayGraceDays: 3,
      },
    });

    const { updateDefaultPolicies } = await import(
      "@/lib/settings/actions/settings.api"
    );
    const payload = { delayPolicy: "Updated" };
    const result = await updateDefaultPolicies(payload);

    expect(result.delayPolicy).toBe("Updated");
    expect(mockPatch).toHaveBeenCalledWith(
      "/settings/default-policies",
      payload,
    );
  });
});
