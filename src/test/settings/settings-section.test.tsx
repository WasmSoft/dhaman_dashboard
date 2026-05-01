import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/axios-instance";

const mockedSettingsHooks = vi.hoisted(() => ({
  useSettingsQuery: vi.fn(),
  useUpdateSettingsMutation: vi.fn(),
  useDefaultPoliciesQuery: vi.fn(),
  useUpdateDefaultPoliciesMutation: vi.fn(),
}));

vi.mock("@/hooks/settings", () => mockedSettingsHooks);

import { SettingsSection } from "@/components/settings";

describe("SettingsSection", () => {
  it("renders the settings title", () => {
    mockedSettingsHooks.useSettingsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });
    mockedSettingsHooks.useUpdateSettingsMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn(),
    });
    mockedSettingsHooks.useDefaultPoliciesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });
    mockedSettingsHooks.useUpdateDefaultPoliciesMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn(),
    });

    render(<SettingsSection />);

    expect(screen.getByText("الإعدادات")).toBeInTheDocument();
  });

  it("shows the agreement policies panel when selected", () => {
    mockedSettingsHooks.useSettingsQuery.mockReturnValue({
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
      isLoading: false,
      error: null,
    });
    mockedSettingsHooks.useUpdateSettingsMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn(),
    });
    mockedSettingsHooks.useDefaultPoliciesQuery.mockReturnValue({
      data: {
        defaultDelayPolicy: "Delay policy text",
        defaultCancellationPolicy: null,
        defaultExtraRequestPolicy: null,
        defaultReviewPolicy: null,
      },
      isLoading: false,
      error: null,
    });
    mockedSettingsHooks.useUpdateDefaultPoliciesMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn(),
    });

    render(<SettingsSection />);

    expect(screen.getByText("سياسات الاتفاق الافتراضية")).toBeInTheDocument();
  });

  it("renders localized error when API returns an error", () => {
    mockedSettingsHooks.useSettingsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new ApiError({
        message: "تعذر تحميل الإعدادات",
        statusCode: 500,
      }),
    });
    mockedSettingsHooks.useUpdateSettingsMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn(),
    });
    mockedSettingsHooks.useDefaultPoliciesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });
    mockedSettingsHooks.useUpdateDefaultPoliciesMutation.mockReturnValue({
      isPending: false,
      mutateAsync: vi.fn(),
    });

    render(<SettingsSection />);

    expect(
      screen.getByText("تعذر تحميل الإعدادات"),
    ).toBeInTheDocument();
  });
});
