import { describe, expect, it } from "vitest";

import {
  SUPPORTED_CURRENCIES,
  SUPPORTED_LOCALES,
  usersAccountUpdateSchema,
  usersProfileUpdateSchema,
} from "@/lib/users";

describe("users schemas", () => {
  it("validates account partial updates and rejects private fields", () => {
    expect(
      usersAccountUpdateSchema.parse({
        name: "Sara",
        avatarUrl: "https://example.com/avatar.png",
      }),
    ).toEqual({
      name: "Sara",
      avatarUrl: "https://example.com/avatar.png",
    });

    expect(() =>
      usersAccountUpdateSchema.parse({
        name: "x".repeat(101),
      }),
    ).toThrow();

    expect(() =>
      usersAccountUpdateSchema.parse({
        email: "a@example.com",
      } as never),
    ).toThrow();

    expect(() =>
      usersAccountUpdateSchema.parse({
        avatarUrl: "not-a-url",
      }),
    ).toThrow();
  });

  it("validates profile partial updates and supported enums", () => {
    expect(
      usersProfileUpdateSchema.parse({
        businessName: "Studio",
        bio: "Welcome",
        specialization: "Branding",
        preferredCurrency: "SAR",
        locale: "ar",
      }),
    ).toEqual({
      businessName: "Studio",
      bio: "Welcome",
      specialization: "Branding",
      preferredCurrency: "SAR",
      locale: "ar",
    });

    expect(() =>
      usersProfileUpdateSchema.parse({
        businessName: "x".repeat(201),
      }),
    ).toThrow();

    expect(() =>
      usersProfileUpdateSchema.parse({
        preferredCurrency: "GBP",
      } as never),
    ).toThrow();

    expect(() =>
      usersProfileUpdateSchema.parse({
        locale: "fr",
      } as never),
    ).toThrow();

    expect(SUPPORTED_CURRENCIES).toContain("SAR");
    expect(SUPPORTED_LOCALES).toEqual(["ar", "en"]);
  });
});
