import { describe, expect, it } from "vitest";

import {
  portalRejectSchema,
  portalRequestChangesSchema,
} from "@/lib/client-portal";

describe("client-portal.schema", () => {
  it("validates request changes reason boundaries", () => {
    expect(() =>
      portalRequestChangesSchema.parse({ reason: "123456789" }),
    ).toThrowError();

    expect(
      portalRequestChangesSchema.parse({ reason: "1234567890" }).reason,
    ).toBe("1234567890");

    expect(
      portalRequestChangesSchema.parse({ reason: "a".repeat(2000) }).reason,
    ).toHaveLength(2000);

    expect(() =>
      portalRequestChangesSchema.parse({ reason: "a".repeat(2001) }),
    ).toThrowError();
  });

  it("accepts optional requestedChanges and rejects oversized items", () => {
    expect(
      portalRequestChangesSchema.parse({
        reason: "1234567890",
        requestedChanges: ["Update hero copy"],
      }).requestedChanges,
    ).toEqual(["Update hero copy"]);

    expect(
      portalRequestChangesSchema.parse({ reason: "1234567890" }).requestedChanges,
    ).toBeUndefined();

    expect(() =>
      portalRequestChangesSchema.parse({
        reason: "1234567890",
        requestedChanges: ["a".repeat(501)],
      }),
    ).toThrowError();
  });

  it("validates reject reason boundaries", () => {
    expect(() => portalRejectSchema.parse({ reason: "123456789" })).toThrowError();

    expect(portalRejectSchema.parse({ reason: "1234567890" }).reason).toBe(
      "1234567890",
    );

    expect(portalRejectSchema.parse({ reason: "a".repeat(2000) }).reason).toHaveLength(2000);

    expect(() =>
      portalRejectSchema.parse({ reason: "a".repeat(2001) }),
    ).toThrowError();
  });
});
