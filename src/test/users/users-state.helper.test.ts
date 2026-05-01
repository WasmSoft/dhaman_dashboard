import { describe, expect, it } from "vitest";

import { ApiError } from "@/lib/axios-instance";
import {
  buildUserAvatarFallbackInitial,
  buildUserDisplayName,
  classifyUsersError,
  createCurrentUserPayload,
  createCurrentUserProfilePayload,
  stripPrivateUserFields,
} from "@/lib/users";

describe("users state helpers", () => {
  it("builds safe identity fallbacks", () => {
    expect(buildUserDisplayName({ name: "Sara", email: "sara@example.com" })).toBe(
      "Sara",
    );
    expect(buildUserDisplayName({ name: "", email: "sara@example.com" })).toBe(
      "sara@example.com",
    );
    expect(buildUserAvatarFallbackInitial({ name: "" })).toBe("ا");
    expect(buildUserAvatarFallbackInitial({ name: "Sara" })).toBe("S");
  });

  it("creates partial payloads and strips private fields", () => {
    expect(
      createCurrentUserPayload({
        name: "Sara",
        avatarUrl: "",
        email: "ignore",
      } as never),
    ).toEqual({ name: "Sara" });

    expect(
      createCurrentUserProfilePayload({
        businessName: "",
        bio: "Hello",
        specialization: "",
        preferredCurrency: "SAR",
        locale: "ar",
      }),
    ).toEqual({
      bio: "Hello",
      preferredCurrency: "SAR",
      locale: "ar",
    });

    expect(
      stripPrivateUserFields({
        id: "1",
        userId: "2",
        email: "a@example.com",
        role: "ADMIN",
        passwordHash: "secret",
        accessToken: "token",
        refreshToken: "refresh",
        createdAt: "now",
        updatedAt: "later",
        name: "Sara",
      } as never),
    ).toEqual({ name: "Sara" });
  });

  it("classifies API errors into safe UI states", () => {
    expect(classifyUsersError(new ApiError({ message: "x", statusCode: 401 }))).toEqual(
      expect.objectContaining({ state: "authenticationRequired" }),
    );
    expect(classifyUsersError(new ApiError({ message: "x", statusCode: 404 }))).toEqual(
      expect.objectContaining({ state: "notFound" }),
    );
    expect(classifyUsersError(new ApiError({ message: "x", statusCode: 400 }))).toEqual(
      expect.objectContaining({ state: "validationError" }),
    );
  });
});
