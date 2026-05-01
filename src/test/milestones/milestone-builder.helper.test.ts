// AR: اختبارات مساعدات باني المراحل — تتحقق من تحويل النماذج وإعدادات الـ payload.
// EN: Milestone builder helper tests — verify form-to-payload mapping and reorder payload generation.
import { describe, expect, it } from "vitest";

import {
  buildReorderPayload,
  getCreateMilestoneDefaults,
  mapCreateFormToPayload,
  mapUpdateFormToPayload,
} from "@/lib/milestones/helpers/milestone-builder.helper";

describe("milestone builder helpers", () => {
  it("getCreateMilestoneDefaults returns defaults at the given order", () => {
    const defaults = getCreateMilestoneDefaults(2);
    expect(defaults.orderIndex).toBe(2);
    expect(defaults.acceptanceCriteria).toHaveLength(1);
    expect(defaults.revisionLimit).toBe(3);
  });

  it("mapCreateFormToPayload converts form values to a create payload", () => {
    const payload = mapCreateFormToPayload({
      title: "Phase 1",
      amount: "150.00",
      orderIndex: 1,
      acceptanceCriteria: [{ description: "Wireframe delivered", required: true }],
    });
    expect(payload).toMatchObject({
      title: "Phase 1",
      amount: "150.00",
      orderIndex: 1,
      acceptanceCriteria: [{ description: "Wireframe delivered", required: true }],
    });
  });

  it("mapUpdateFormToPayload builds a partial update payload", () => {
    const payload = mapUpdateFormToPayload({
      title: "Updated Phase",
      amount: "250.00",
    });
    expect(payload).toEqual({
      title: "Updated Phase",
      amount: "250.00",
    });
  });

  it("buildReorderPayload generates contiguous order starting from 1", () => {
    const payload = buildReorderPayload(["mil-a", "mil-b", "mil-c"]);
    expect(payload.milestones).toEqual([
      { milestoneId: "mil-a", orderIndex: 1 },
      { milestoneId: "mil-b", orderIndex: 2 },
      { milestoneId: "mil-c", orderIndex: 3 },
    ]);
  });
});
