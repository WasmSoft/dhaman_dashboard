import { describe, expect, it } from "vitest";

import { policyMutationSchema } from "@/lib/agreement-policies";

describe("agreement-policies.schema", () => {
  it("rejects and accepts the documented numeric boundaries", () => {
    expect(() =>
      policyMutationSchema.parse({ clientReviewPeriodDays: 0 }),
    ).toThrowError();

    expect(
      policyMutationSchema.parse({ clientReviewPeriodDays: 1 })
        .clientReviewPeriodDays,
    ).toBe(1);

    expect(
      policyMutationSchema.parse({ clientReviewPeriodDays: 90 })
        .clientReviewPeriodDays,
    ).toBe(90);

    expect(() =>
      policyMutationSchema.parse({ clientReviewPeriodDays: 91 }),
    ).toThrowError();

    expect(() =>
      policyMutationSchema.parse({ freelancerDelayGraceDays: -1 }),
    ).toThrowError();

    expect(
      policyMutationSchema.parse({ freelancerDelayGraceDays: 0 })
        .freelancerDelayGraceDays,
    ).toBe(0);

    expect(
      policyMutationSchema.parse({ freelancerDelayGraceDays: 30 })
        .freelancerDelayGraceDays,
    ).toBe(30);

    expect(() =>
      policyMutationSchema.parse({ freelancerDelayGraceDays: 31 }),
    ).toThrowError();
  });

  it("rejects empty strings and accepts null or valid text", () => {
    expect(() => policyMutationSchema.parse({ delayPolicy: "" })).toThrowError();

    expect(policyMutationSchema.parse({ delayPolicy: null }).delayPolicy).toBeNull();

    expect(policyMutationSchema.parse({ delayPolicy: "valid" }).delayPolicy).toBe(
      "valid",
    );
  });
});
