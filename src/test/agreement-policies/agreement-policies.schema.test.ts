import { describe, expect, it } from "vitest";

import { policyMutationSchema } from "@/lib/agreement-policies";

describe("agreement-policies.schema", () => {
  it("accepts omitted policy fields", () => {
    expect(policyMutationSchema.parse({})).toEqual({});
  });

  it("rejects empty strings and accepts null or valid text", () => {
    expect(() =>
      policyMutationSchema.parse({ defaultDelayPolicy: "" }),
    ).toThrowError();

    expect(
      policyMutationSchema.parse({ defaultDelayPolicy: null }).defaultDelayPolicy,
    ).toBeNull();

    expect(
      policyMutationSchema.parse({ defaultDelayPolicy: "valid" }).defaultDelayPolicy,
    ).toBe("valid");
  });
});
