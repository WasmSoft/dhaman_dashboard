import { describe, expect, it, vi } from "vitest";

import { axiosInstance } from "@/lib/axios-instance";

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("settings.api general", () => {
  it("gets settings from the settings endpoint", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        id: "1",
        userId: "u1",
        defaultCurrency: "USD",
        defaultServiceType: null,
        aiStrictness: "balanced",
        emailNotificationsEnabled: true,
        defaultDelayPolicy: null,
        defaultCancellationPolicy: null,
        defaultExtraRequestPolicy: null,
        defaultReviewPolicy: null,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
    });

    const { getSettings } = await import(
      "@/lib/settings/actions/settings.api"
    );
    const result = await getSettings();

    expect(result.defaultCurrency).toBe("USD");
    expect(result.aiStrictness).toBe("balanced");
    expect(result.emailNotificationsEnabled).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/settings");
  });

  it("patches general settings to the settings endpoint", async () => {
    const mockPatch = vi.mocked(axiosInstance.patch);
    mockPatch.mockResolvedValueOnce({
      data: {
        id: "1",
        userId: "u1",
        defaultCurrency: "SAR",
        defaultServiceType: "Design",
        aiStrictness: "strict",
        emailNotificationsEnabled: false,
        defaultDelayPolicy: null,
        defaultCancellationPolicy: null,
        defaultExtraRequestPolicy: null,
        defaultReviewPolicy: null,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
    });

    const { updateSettings } = await import(
      "@/lib/settings/actions/settings.api"
    );
    const payload = {
      defaultCurrency: "SAR",
      aiStrictness: "strict" as const,
    };
    const result = await updateSettings(payload);

    expect(result.defaultCurrency).toBe("SAR");
    expect(result.aiStrictness).toBe("strict");
    expect(mockPatch).toHaveBeenCalledWith("/settings", payload);
  });
});

describe("settings.api default-policies", () => {
  it("gets default policies from the settings endpoint", async () => {
    const mockGet = vi.mocked(axiosInstance.get);
    mockGet.mockResolvedValueOnce({
      data: {
        defaultDelayPolicy: null,
        defaultCancellationPolicy: null,
        defaultExtraRequestPolicy: null,
        defaultReviewPolicy: null,
      },
    });

    const { getDefaultPolicies } = await import(
      "@/lib/settings/actions/settings.api"
    );
    const result = await getDefaultPolicies();

    expect(result.defaultDelayPolicy).toBeNull();
    expect(mockGet).toHaveBeenCalledWith("/settings/default-policies");
  });

  it("patches default policies to the settings endpoint", async () => {
    const mockPatch = vi.mocked(axiosInstance.patch);
    mockPatch.mockResolvedValueOnce({
      data: {
        defaultDelayPolicy: "Updated",
        defaultCancellationPolicy: null,
        defaultExtraRequestPolicy: null,
        defaultReviewPolicy: null,
      },
    });

    const { updateDefaultPolicies } = await import(
      "@/lib/settings/actions/settings.api"
    );
    const payload = { defaultDelayPolicy: "Updated" };
    const result = await updateDefaultPolicies(payload);

    expect(result.defaultDelayPolicy).toBe("Updated");
    expect(mockPatch).toHaveBeenCalledWith(
      "/settings/default-policies",
      payload,
    );
  });
});
