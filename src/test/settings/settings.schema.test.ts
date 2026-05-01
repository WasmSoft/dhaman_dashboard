import { describe, expect, it } from "vitest";

import { settingsSchema } from "@/lib/settings/schemas";

describe("settings.schema", () => {
  it("accepts valid defaultCurrency uppercase string", () => {
    const result = settingsSchema.safeParse({ defaultCurrency: "SAR" });

    expect(result.success).toBe(true);
  });

  it("rejects defaultCurrency with lowercase letters", () => {
    const result = settingsSchema.safeParse({ defaultCurrency: "sar" });

    expect(result.success).toBe(false);
  });

  it("rejects defaultCurrency longer than 10 characters", () => {
    const result = settingsSchema.safeParse({
      defaultCurrency: "ABCDEFGHIJK",
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid aiStrictness values", () => {
    const valid = ["lenient", "balanced", "strict"];

    for (const value of valid) {
      const result = settingsSchema.safeParse({ aiStrictness: value });

      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid aiStrictness values", () => {
    const result = settingsSchema.safeParse({
      aiStrictness: "flexible",
    });

    expect(result.success).toBe(false);
  });

  it("rejects emailNotificationsEnabled that is not a boolean", () => {
    const result = settingsSchema.safeParse({
      emailNotificationsEnabled: "yes",
    });

    expect(result.success).toBe(false);
  });

  it("accepts partial payload with only one field", () => {
    const result = settingsSchema.safeParse({
      defaultCurrency: "EUR",
    });

    expect(result.success).toBe(true);
  });

  it("accepts defaultServiceType up to 120 characters", () => {
    const result = settingsSchema.safeParse({
      defaultServiceType: "Design",
    });

    expect(result.success).toBe(true);
  });

  it("rejects defaultServiceType longer than 120 characters", () => {
    const result = settingsSchema.safeParse({
      defaultServiceType: "A".repeat(121),
    });

    expect(result.success).toBe(false);
  });
});
