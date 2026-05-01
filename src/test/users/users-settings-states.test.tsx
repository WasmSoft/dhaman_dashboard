import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/axios-instance";

const mockedUsersHooks = vi.hoisted(() => ({
  useCurrentUserQuery: vi.fn(),
  useUserProfileQuery: vi.fn(),
  useUpdateCurrentUserMutation: vi.fn(),
  useUpdateUserProfileMutation: vi.fn(),
}));

vi.mock("@/hooks/users", () => mockedUsersHooks);

import { UserSettingsSection } from "@/components/users";

describe("UserSettingsSection", () => {
  beforeEach(() => {
    mockedUsersHooks.useCurrentUserQuery.mockReset();
    mockedUsersHooks.useUserProfileQuery.mockReset();
    mockedUsersHooks.useUpdateCurrentUserMutation.mockReset();
    mockedUsersHooks.useUpdateUserProfileMutation.mockReset();
  });

  it("shows loading skeletons while the queries are pending", () => {
    mockedUsersHooks.useCurrentUserQuery.mockReturnValue({ isLoading: true });
    mockedUsersHooks.useUserProfileQuery.mockReturnValue({ isLoading: true });
    mockedUsersHooks.useUpdateCurrentUserMutation.mockReturnValue({ isPending: false });
    mockedUsersHooks.useUpdateUserProfileMutation.mockReturnValue({ isPending: false });

    const { container } = render(<UserSettingsSection />);

    expect(container.querySelectorAll('[data-slot="skeleton"]').length).toBeGreaterThan(0);
  });

  it("shows a retryable error state", () => {
    const refetch = vi.fn();

    mockedUsersHooks.useCurrentUserQuery.mockReturnValue({ isLoading: false, error: new Error("boom"), refetch });
    mockedUsersHooks.useUserProfileQuery.mockReturnValue({ isLoading: false, error: null, refetch });
    mockedUsersHooks.useUpdateCurrentUserMutation.mockReturnValue({ isPending: false });
    mockedUsersHooks.useUpdateUserProfileMutation.mockReturnValue({ isPending: false });

    render(<UserSettingsSection />);

    expect(screen.getByText("حدث خطأ غير متوقع")).toBeInTheDocument();
    expect(screen.getByText("إعادة المحاولة")).toBeInTheDocument();
  });

  it("shows authentication guidance for 401s", () => {
    mockedUsersHooks.useCurrentUserQuery.mockReturnValue({
      isLoading: false,
      error: new ApiError({ message: "auth", statusCode: 401 }),
      refetch: vi.fn(),
    });
    mockedUsersHooks.useUserProfileQuery.mockReturnValue({
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    mockedUsersHooks.useUpdateCurrentUserMutation.mockReturnValue({ isPending: false });
    mockedUsersHooks.useUpdateUserProfileMutation.mockReturnValue({ isPending: false });

    render(<UserSettingsSection />);

    expect(screen.getByText("تسجيل الدخول مطلوب")).toBeInTheDocument();
  });

  it("renders the editable forms when data is available", () => {
    mockedUsersHooks.useCurrentUserQuery.mockReturnValue({
      isLoading: false,
      data: { id: "1", name: "Sara", email: "sara@example.com", role: "FREELANCER", avatarUrl: null },
      error: null,
      refetch: vi.fn(),
    });
    mockedUsersHooks.useUserProfileQuery.mockReturnValue({
      isLoading: false,
      data: {
        id: "2",
        userId: "1",
        businessName: "Studio",
        bio: "Hello",
        specialization: "Branding",
        preferredCurrency: "SAR",
        locale: "ar",
      },
      error: null,
      refetch: vi.fn(),
    });
    mockedUsersHooks.useUpdateCurrentUserMutation.mockReturnValue({ isPending: false, mutateAsync: vi.fn() });
    mockedUsersHooks.useUpdateUserProfileMutation.mockReturnValue({ isPending: false, mutateAsync: vi.fn() });

    render(<UserSettingsSection />);

    expect(screen.getByText("إعدادات الحساب والملف")).toBeInTheDocument();
    expect(screen.getByText("الحساب")).toBeInTheDocument();
    expect(screen.getByText("الملف المهني")).toBeInTheDocument();
  });
});
