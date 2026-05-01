import { describe, expect, it } from "vitest";

import { deliverySubmitSchema } from "@/lib/deliveries";

describe("deliverySubmitSchema", () => {
  it("accepts a confirmed submit payload", () => {
    const result = deliverySubmitSchema.safeParse({
      noteToClient: "ابدأ بمراجعة النسخة الرئيسية.",
      confirmationAccepted: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects submit payloads without the confirmation flag", () => {
    const result = deliverySubmitSchema.safeParse({
      noteToClient: "بدون تأكيد",
      confirmationAccepted: false,
    });

    expect(result.success).toBe(false);
  });
});
