// AR: اختبارات مخطط Zod لرفض طلب تغيير.
// EN: Tests for the decline change request Zod schema.
import { describe, it, expect } from "vitest";
import { declineChangeRequestSchema } from "@/lib/change-requests/schemas";

describe("declineChangeRequestSchema", () => {
  it("accepts a valid reason (20 chars)", () => {
    const result = declineChangeRequestSchema.safeParse({
      reason: "This is a valid reason with enough text.",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a reason at minimum length (10 chars)", () => {
    const result = declineChangeRequestSchema.safeParse({
      reason: "1234567890",
    });
    expect(result.success).toBe(true);
  });

  it("rejects reason below 10 characters", () => {
    const result = declineChangeRequestSchema.safeParse({
      reason: "Too short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const reasonIssue = result.error.issues.find((i) =>
        i.path.includes("reason"),
      );
      expect(reasonIssue).toBeDefined();
    }
  });

  it("rejects reason above 2000 characters", () => {
    const result = declineChangeRequestSchema.safeParse({
      reason: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing reason", () => {
    const result = declineChangeRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects empty reason", () => {
    const result = declineChangeRequestSchema.safeParse({
      reason: "",
    });
    expect(result.success).toBe(false);
  });
});
