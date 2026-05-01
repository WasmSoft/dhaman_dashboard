import { describe, expect, it, vi } from "vitest";

import { agreementPoliciesQueryKeys, upsertAgreementPolicyMutationOptions } from "@/lib/agreement-policies/actions";

describe("agreement-policies.mutations", () => {
  it("invalidates the current agreement policy query after save", async () => {
    const invalidateQueries = vi.fn().mockResolvedValue(undefined);
    const queryClient = { invalidateQueries } as never;

    const options = upsertAgreementPolicyMutationOptions(queryClient);

    await options.onSuccess?.(
      {
        id: "pol-1",
        agreementId: "agr-1",
        delayPolicy: null,
        cancellationPolicy: null,
        extraRequestPolicy: null,
        reviewPolicy: null,
        clientReviewPeriodDays: 7,
        freelancerDelayGraceDays: 3,
        createdAt: "2026-05-01T00:00:00.000Z",
        updatedAt: "2026-05-01T00:00:00.000Z",
      },
      { agreementId: "agr-1", payload: { delayPolicy: "Updated" } },
      undefined,
      {} as never,
    );

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: agreementPoliciesQueryKeys.byAgreement("agr-1"),
    });
  });
});
