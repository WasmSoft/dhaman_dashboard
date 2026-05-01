import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";

import type {
  CreateDeliveryPayload,
  Delivery,
  SubmitDeliveryPayload,
  UpdateDeliveryPayload,
} from "@/types";

import { agreementsQueryKeys } from "@/lib/agreements/actions/agreements.keys";

import {
  createDelivery,
  submitDelivery,
  updateDelivery,
} from "./deliveries.api";
import { deliveriesQueryKeys } from "./deliveries.keys";
import { milestonesQueryKeys } from "@/lib/milestones/actions/milestones.keys";

// AR: تبني create mutation options مع invalidation لقوائم التسليمات والمراحل.
// EN: Builds create-delivery mutation options with invalidation for delivery lists and milestones.
export function createDeliveryMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Delivery,
  Error,
  { milestoneId: string; payload: CreateDeliveryPayload }
> {
  return {
    mutationFn: ({
      milestoneId,
      payload,
    }: {
      milestoneId: string;
      payload: CreateDeliveryPayload;
    }) => createDelivery(milestoneId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: deliveriesQueryKeys.lists(),
      });
      await queryClient.invalidateQueries({
        queryKey: milestonesQueryKeys.all,
      });
    },
  };
}

// AR: تبني update mutation options وتحدث list/detail keys بعد النجاح.
// EN: Builds update-delivery mutation options and refreshes list/detail keys after success.
export function updateDeliveryMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Delivery,
  Error,
  { deliveryId: string; payload: UpdateDeliveryPayload }
> {
  return {
    mutationFn: ({
      deliveryId,
      payload,
    }: {
      deliveryId: string;
      payload: UpdateDeliveryPayload;
    }) => updateDelivery(deliveryId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: deliveriesQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: deliveriesQueryKeys.detail(variables.deliveryId),
        }),
      ]);
    },
  };
}

// AR: تبني submit mutation options مع invalidation للقوائم والتفاصيل والاتفاقيات.
// EN: Builds submit-delivery mutation options with invalidation for lists, details, and agreements.
export function submitDeliveryMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  Delivery,
  Error,
  { deliveryId: string; payload?: SubmitDeliveryPayload }
> {
  return {
    mutationFn: ({
      deliveryId,
      payload,
    }: {
      deliveryId: string;
      payload?: SubmitDeliveryPayload;
    }) => submitDelivery(deliveryId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: deliveriesQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: deliveriesQueryKeys.detail(variables.deliveryId),
        }),
        queryClient.invalidateQueries({
          queryKey: agreementsQueryKeys.all,
        }),
      ]);
    },
  };
}