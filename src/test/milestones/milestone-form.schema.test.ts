// AR: اختبارات سكيما نموذج المرحلة — تتحقق من صحة التحقق من صحة الحقول الأساسية.
// EN: Milestone form schema tests — verify validation rules for the core fields.
import { describe, expect, it } from "vitest";

import { createMilestoneSchema, updateMilestoneSchema } from "@/lib/milestones/schemas/milestone-form.schema";

function validCreateValues() {
  return {
    title: "Phase 1",
    amount: "150.00",
    orderIndex: 1,
    acceptanceCriteria: [{ description: "Wireframe delivered", required: true }],
  };
}

describe("createMilestoneSchema", () => {
  it("accepts a valid create payload", () => {
    const result = createMilestoneSchema.safeParse(validCreateValues());
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = createMilestoneSchema.safeParse({
      ...validCreateValues(),
      title: "",
    });
    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(
        result.error.issues.find(
          (issue) => issue.path[0] === "title",
        ),
      ).toBeTruthy();
    }
  });

  it("rejects empty acceptanceCriteria array", () => {
    const result = createMilestoneSchema.safeParse({
      ...validCreateValues(),
      acceptanceCriteria: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid amount format", () => {
    const result = createMilestoneSchema.safeParse({
      ...validCreateValues(),
      amount: "-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects orderIndex less than 1", () => {
    const result = createMilestoneSchema.safeParse({
      ...validCreateValues(),
      orderIndex: 0,
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional revisionLimit", () => {
    const result = createMilestoneSchema.safeParse({
      ...validCreateValues(),
      revisionLimit: 2,
    });
    expect(result.success).toBe(true);
  });
});

describe("updateMilestoneSchema", () => {
  it("accepts a partial update payload", () => {
    const result = updateMilestoneSchema.safeParse({ title: "Updated" });
    expect(result.success).toBe(true);
  });

  it("rejects empty acceptanceCriteria when explicitly provided", () => {
    const result = updateMilestoneSchema.safeParse({
      acceptanceCriteria: [],
    });
    expect(result.success).toBe(false);
  });
});
