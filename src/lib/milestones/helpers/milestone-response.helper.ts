import type { Milestone } from "@/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMilestoneLike(value: unknown): value is Milestone {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.agreementId === "string" &&
    typeof value.title === "string" &&
    typeof value.amount === "string" &&
    typeof value.currency === "string"
  );
}

// AR: تستخرج هذه الدالة المرحلة الفعلية من استجابات مختلفة التغليف حتى تبقى الواجهة مرنة مع تغييرات الخادم.
// EN: This function extracts the actual milestone from differently wrapped API responses so the UI stays resilient to backend envelope changes.
export function resolveMilestoneDetail(input: unknown): Milestone | null {
  if (isMilestoneLike(input)) {
    return input;
  }

  if (isRecord(input) && "data" in input) {
    return resolveMilestoneDetail(input.data);
  }

  return null;
}
