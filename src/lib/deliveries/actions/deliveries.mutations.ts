import type { QueryClient, UseMutationOptions } from "@tanstack/react-query";

import type {
  CreateDeliveryInput,
  DeliveryDetailsResponse,
  PortalDeliveryActionResponse,
  PortalRequestDeliveryChangesInput,
  SubmitDeliveryInput,
  UpdateDeliveryInput,
} from "@/types";

import { agreementsQueryKeys } from "@/lib/agreements/actions";
import { aiReviewsQueryKeys } from "@/lib/ai-review/actions";
import { milestonesQueryKeys } from "@/lib/milestones/actions";
import { paymentsQueryKeys } from "@/lib/payments/actions";
import { timelineQueryKeys } from "@/lib/timeline-events/actions";

import {
  acceptDeliveryFromPortal,
  createDelivery,
  requestDeliveryChangesFromPortal,
  submitDelivery,
  updateDelivery,
} from "./deliveries.api";
import { deliveriesQueryKeys } from "./deliveries.keys";

async function invalidateAuthenticatedDeliveryCaches(
  queryClient: QueryClient,
  agreementId: string,
  milestoneId: string,
  deliveryId: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: deliveriesQueryKeys.lists() }),
    queryClient.invalidateQueries({
      queryKey: deliveriesQueryKeys.detail(deliveryId),
    }),
    queryClient.invalidateQueries({ queryKey: agreementsQueryKeys.lists() }),
    queryClient.invalidateQueries({
      queryKey: agreementsQueryKeys.detail(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: milestonesQueryKeys.list(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: milestonesQueryKeys.detail(milestoneId),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.agreementList(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.agreementHistoryList(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: timelineQueryKeys.agreementTimelines(),
    }),
  ]);
}

async function invalidatePortalDeliveryCaches(
  queryClient: QueryClient,
  token: string,
  deliveryId: string,
  agreementId: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: deliveriesQueryKeys.lists() }),
    queryClient.invalidateQueries({
      queryKey: deliveriesQueryKeys.portalWorkspace(token),
    }),
    queryClient.invalidateQueries({
      queryKey: deliveriesQueryKeys.portalDetail(token, deliveryId),
    }),
    queryClient.invalidateQueries({ queryKey: agreementsQueryKeys.lists() }),
    queryClient.invalidateQueries({
      queryKey: agreementsQueryKeys.detail(agreementId),
    }),
    queryClient.invalidateQueries({ queryKey: milestonesQueryKeys.lists() }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.portalLists(),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.portalHistory(),
    }),
    queryClient.invalidateQueries({
      queryKey: timelineQueryKeys.portalTimelines(),
    }),
    queryClient.invalidateQueries({ queryKey: aiReviewsQueryKeys.lists() }),
  ]);
}

// AR: خيارات طفرة إنشاء مسودة تسليم.
// EN: Mutation options for creating a delivery draft.
export function createDeliveryMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  DeliveryDetailsResponse,
  Error,
  { milestoneId: string; payload: CreateDeliveryInput }
> {
  return {
    mutationFn: ({ milestoneId, payload }) => createDelivery(milestoneId, payload),
    onSuccess: async (result) => {
      await invalidateAuthenticatedDeliveryCaches(
        queryClient,
        result.data.agreementId,
        result.data.milestoneId,
        result.data.id,
      );
    },
  };
}

// AR: خيارات طفرة تحديث مسودة تسليم.
// EN: Mutation options for updating a delivery draft.
export function updateDeliveryMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  DeliveryDetailsResponse,
  Error,
  { deliveryId: string; payload: UpdateDeliveryInput }
> {
  return {
    mutationFn: ({ deliveryId, payload }) => updateDelivery(deliveryId, payload),
    onSuccess: async (result) => {
      await invalidateAuthenticatedDeliveryCaches(
        queryClient,
        result.data.agreementId,
        result.data.milestoneId,
        result.data.id,
      );
    },
  };
}

// AR: خيارات طفرة إرسال التسليم إلى العميل.
// EN: Mutation options for submitting the delivery to the client.
export function submitDeliveryMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<
  DeliveryDetailsResponse,
  Error,
  { deliveryId: string; payload: SubmitDeliveryInput }
> {
  return {
    mutationFn: ({ deliveryId, payload }) => submitDelivery(deliveryId, payload),
    onSuccess: async (result) => {
      await invalidateAuthenticatedDeliveryCaches(
        queryClient,
        result.data.agreementId,
        result.data.milestoneId,
        result.data.id,
      );
    },
  };
}

// AR: خيارات طفرة قبول التسليم من بوابة العميل.
// EN: Mutation options for accepting the delivery from the client portal.
export function acceptDeliveryMutationOptions(
  queryClient: QueryClient,
  token: string,
  deliveryId: string,
): UseMutationOptions<PortalDeliveryActionResponse, Error, void> {
  return {
    mutationFn: () => acceptDeliveryFromPortal(token, deliveryId),
    onSuccess: async (result) => {
      await invalidatePortalDeliveryCaches(
        queryClient,
        token,
        deliveryId,
        result.data.agreementId,
      );
    },
  };
}

// AR: خيارات طفرة طلب التعديلات من بوابة العميل.
// EN: Mutation options for requesting changes from the client portal.
export function requestDeliveryChangesMutationOptions(
  queryClient: QueryClient,
  token: string,
  deliveryId: string,
): UseMutationOptions<
  PortalDeliveryActionResponse,
  Error,
  PortalRequestDeliveryChangesInput
> {
  return {
    mutationFn: (input) =>
      requestDeliveryChangesFromPortal(token, deliveryId, input),
    onSuccess: async (result) => {
      await invalidatePortalDeliveryCaches(
        queryClient,
        token,
        deliveryId,
        result.data.agreementId,
      );
    },
  };
}
