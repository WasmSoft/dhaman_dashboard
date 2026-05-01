// AR: اختبارات مفاتيح الاستعلام الخاصة بالمراحل لضمان ثبات التخزين المؤقت.
// EN: Milestones query key tests to ensure cache stability.
import { describe, expect, it } from "vitest";

import { milestonesQueryKeys } from "@/lib/milestones/actions";

describe("milestonesQueryKeys", () => {
  it("builds a stable list key for one agreement", () => {
    expect(milestonesQueryKeys.list("agr-1")).toEqual([
      "milestones",
      "list",
      "agr-1",
    ]);
  });

  it("builds a stable detail key for one milestone", () => {
    expect(milestonesQueryKeys.detail("mil-1")).toEqual([
      "milestones",
      "details",
      "mil-1",
    ]);
  });
});
