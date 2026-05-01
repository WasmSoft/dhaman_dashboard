import { afterEach, describe, expect, it, vi } from "vitest";

import { API_PATHS } from "@/lib/api-paths";
import {
  getCurrentUser,
  getCurrentUserProfile,
  updateCurrentUser,
  updateCurrentUserProfile,
} from "@/lib/users";

const mockedAxios = vi.hoisted(() => ({
  get: vi.fn(),
  patch: vi.fn(),
}));

vi.mock("@/lib/axios-instance", () => ({
  axiosInstance: mockedAxios,
}));

describe("users api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockedAxios.get.mockReset();
    mockedAxios.patch.mockReset();
  });

  it("uses the current user endpoints and strips private fields", async () => {
    mockedAxios.get.mockResolvedValue({ data: { id: "1" } });
    mockedAxios.patch.mockResolvedValue({ data: { id: "1" } });

    await getCurrentUser();
    await updateCurrentUser({
      name: "Sara",
      email: "ignored@example.com",
      role: "ADMIN",
      passwordHash: "secret",
      id: "skip",
      userId: "skip",
      createdAt: "skip",
      updatedAt: "skip",
      token: "skip",
    } as never);
    await getCurrentUserProfile();
    await updateCurrentUserProfile({
      businessName: "Studio",
      passwordHash: "secret",
      userId: "skip",
      id: "skip",
      createdAt: "skip",
      updatedAt: "skip",
    } as never);

    expect(mockedAxios.get).toHaveBeenCalledWith(API_PATHS.USERS.CURRENT_USER);
    expect(mockedAxios.patch).toHaveBeenNthCalledWith(
      1,
      API_PATHS.USERS.CURRENT_USER,
      expect.objectContaining({ name: "Sara" }),
    );
    expect(mockedAxios.patch).toHaveBeenNthCalledWith(
      1,
      API_PATHS.USERS.CURRENT_USER,
      expect.not.objectContaining({
        email: expect.any(String),
        role: expect.any(String),
        passwordHash: expect.any(String),
        id: expect.any(String),
        userId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        token: expect.any(String),
      }),
    );
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, API_PATHS.USERS.CURRENT_USER_PROFILE);
    expect(mockedAxios.patch).toHaveBeenNthCalledWith(
      2,
      API_PATHS.USERS.CURRENT_USER_PROFILE,
      expect.not.objectContaining({
        passwordHash: expect.any(String),
        userId: expect.any(String),
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });
});
