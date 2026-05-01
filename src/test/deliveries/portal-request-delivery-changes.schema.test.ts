import { describe, expect, it } from "vitest";

import { portalRequestDeliveryChangesSchema } from "@/lib/deliveries";

describe("portalRequestDeliveryChangesSchema", () => {
  it("accepts a valid request changes payload", () => {
    const result = portalRequestDeliveryChangesSchema.safeParse({
      reason: "يرجى تعديل التباعد بين البطاقات في نسخة الجوال.",
      requestedChanges: ["تقليل المسافة أعلى القسم الأول"],
    });

    expect(result.success).toBe(true);
  });

  it("rejects a request changes payload with a short reason", () => {
    const result = portalRequestDeliveryChangesSchema.safeParse({
      reason: "قصير",
    });

    expect(result.success).toBe(false);
  });
});
