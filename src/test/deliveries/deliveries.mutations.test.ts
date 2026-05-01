import type { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";

import {
  acceptDeliveryMutationOptions,
  createDeliveryMutationOptions,
  deliveriesQueryKeys,
  requestDeliveryChangesMutationOptions,
  submitDeliveryMutationOptions,
  updateDeliveryMutationOptions,
} from "@/lib/deliveries/actions";

describe("deliveries.mutations", () => {
  it("invalidates authenticated delivery caches after create", async () => {
    const queryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    } as unknown as QueryClient;

    const options = createDeliveryMutationOptions(queryClient);
    await options.onSuccess?.(
      {
        data: {
          id: "del-1",
          agreementId: "agr-1",
          milestoneId: "mil-1",
        },
      } as never,
      { milestoneId: "mil-1", payload: { summary: "Valid summary text." } },
      undefined,
    );

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: deliveriesQueryKeys.lists(),
    });
  });

  it("invalidates the portal detail and workspace after accept", async () => {
    const queryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    } as unknown as QueryClient;

    const options = acceptDeliveryMutationOptions(queryClient, "tok-1", "del-1");
    await options.onSuccess?.(
      {
        data: {
          agreementId: "agr-1",
          status: "ACTIVE",
          message: "accepted",
        },
      } as never,
      undefined,
      undefined,
    );

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: deliveriesQueryKeys.portalWorkspace("tok-1"),
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: deliveriesQueryKeys.portalDetail("tok-1", "del-1"),
    });
  });

  it("exposes mutation functions for update, submit, and request changes", () => {
    const queryClient = {
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    } as unknown as QueryClient;

    expect(updateDeliveryMutationOptions(queryClient).mutationFn).toBeTypeOf("function");
    expect(submitDeliveryMutationOptions(queryClient).mutationFn).toBeTypeOf("function");
    expect(
      requestDeliveryChangesMutationOptions(queryClient, "tok-1", "del-1").mutationFn,
    ).toBeTypeOf("function");
  });
});
