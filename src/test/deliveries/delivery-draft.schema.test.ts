import { describe, expect, it } from "vitest";

import { deliveryDraftSchema } from "@/lib/deliveries";

describe("deliveryDraftSchema", () => {
  it("accepts a valid delivery draft payload", () => {
    const result = deliveryDraftSchema.safeParse({
      deliveryUrl: "https://example.com/review",
      summary: "This delivery includes the agreed draft and preview assets.",
      notes: "Please focus on the layout hierarchy.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a summary shorter than the backend minimum", () => {
    const result = deliveryDraftSchema.safeParse({
      summary: "قصير",
    });

    expect(result.success).toBe(false);
  });
});
