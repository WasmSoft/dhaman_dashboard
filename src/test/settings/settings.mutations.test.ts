import { describe, expect, it, vi } from "vitest";

import { settingsQueryKeys, updateDefaultPoliciesMutationOptions } from "@/lib/settings/actions";

describe("settings.mutations", () => {
  it("invalidates the default policies query after save", async () => {
    const invalidateQueries = vi.fn().mockResolvedValue(undefined);
    const queryClient = { invalidateQueries } as never;

    const options = updateDefaultPoliciesMutationOptions(queryClient);

    await options.onSuccess?.(
      {
        delayPolicy: null,
        cancellationPolicy: null,
        extraRequestPolicy: null,
        reviewPolicy: null,
        clientReviewPeriodDays: 7,
        freelancerDelayGraceDays: 3,
      },
      { delayPolicy: "Updated" },
      undefined,
      {} as never,
    );

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: settingsQueryKeys.defaultPolicies(),
    });
  });
});
