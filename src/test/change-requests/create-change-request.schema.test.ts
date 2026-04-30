// AR: اختبارات مخطط Zod لإنشاء طلب تغيير.
// EN: Tests for the create change request Zod schema.
import { describe, it, expect } from "vitest";
import { createChangeRequestSchema } from "@/lib/change-requests/schemas";

describe("createChangeRequestSchema", () => {
  const validPayload = {
    title: "Test Change Request",
    description: "This is a detailed description of the change request.",
    amount: "1500.00",
    currency: "USD",
    acceptanceCriteria: ["All pages must load in under 2 seconds"],
    timelineDays: 7,
  };

  const validMinimalPayload = {
    title: "Min",
    description: "Minimum description here.",
    amount: "1",
    currency: "USD",
    acceptanceCriteria: ["Done"],
  };

  it("accepts a valid full payload", () => {
    const result = createChangeRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts a valid minimal payload", () => {
    const result = createChangeRequestSchema.safeParse(validMinimalPayload);
    expect(result.success).toBe(true);
  });

  it("accepts payload with optional fields omitted", () => {
    const result = createChangeRequestSchema.safeParse({
      title: "Test",
      description: "Description text here ok.",
      amount: "100",
      currency: "USD",
      acceptanceCriteria: ["Test"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects title below 3 characters", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      title: "ab",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const titleIssue = result.error.issues.find((i) =>
        i.path.includes("title"),
      );
      expect(titleIssue).toBeDefined();
    }
  });

  it("rejects title above 160 characters", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      title: "a".repeat(161),
    });
    expect(result.success).toBe(false);
  });

  it("rejects description below 10 characters", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      description: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const descIssue = result.error.issues.find((i) =>
        i.path.includes("description"),
      );
      expect(descIssue).toBeDefined();
    }
  });

  it("rejects description above 3000 characters", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      description: "a".repeat(3001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty acceptance criteria array", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      acceptanceCriteria: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects acceptance criteria with empty strings", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      acceptanceCriteria: [""],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid amount (zero)", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      amount: "0",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid amount (negative)", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      amount: "-100",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid amount (non-numeric)", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      amount: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("rejects timelineDays of 0", () => {
    const result = createChangeRequestSchema.safeParse({
      ...validPayload,
      timelineDays: 0,
    });
    expect(result.success).toBe(false);
  });
});
