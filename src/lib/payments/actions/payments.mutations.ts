import type {
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import type {
  FundMilestoneInput,
  PaymentDetailsResponse,
  PortalFundPaymentInput,
  PortalReleaseConfirmationInput,
  ReleasePaymentInput,
} from "@/types";

import { agreementsQueryKeys } from "@/lib/agreements/actions";
import { milestonesQueryKeys } from "@/lib/milestones/actions";
import { timelineQueryKeys } from "@/lib/timeline-events/actions";

import {
  fundMilestone,
  releasePayment,
  fundPaymentFromPortal,
  confirmReleaseFromPortal,
} from "./payments.api";
import { paymentsQueryKeys } from "./payments.keys";

// AR: دالة مشتركة لإلغاء صلاحية الكاشات المرتبطة بالدفعات بعد أي طفرة.
// EN: Shared helper to invalidate payment-related caches after any mutation.
async function invalidatePaymentRelatedCaches(
  queryClient: QueryClient,
  agreementId: string,
  paymentId: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.agreementList(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.detail(paymentId),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.receipt(paymentId),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.agreementHistoryList(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: agreementsQueryKeys.detail(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: agreementsQueryKeys.lists(),
    }),
    queryClient.invalidateQueries({
      queryKey: milestonesQueryKeys.list(agreementId),
    }),
    queryClient.invalidateQueries({
      queryKey: timelineQueryKeys.agreementTimelines(),
    }),
  ]);
}

// AR: دالة مشتركة لإلغاء صلاحية كاشات البوابة بعد طفرة.
// EN: Shared helper to invalidate portal caches after a mutation.
async function invalidatePortalPaymentCaches(
  queryClient: QueryClient,
  token: string,
  paymentId: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.portalList(token),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.portalHistoryList(token),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.detail(paymentId),
    }),
    queryClient.invalidateQueries({
      queryKey: paymentsQueryKeys.receipt(paymentId),
    }),
    queryClient.invalidateQueries({
      queryKey: timelineQueryKeys.portalTimelines(),
    }),
  ]);
}

// AR: خيارات طفرة تمويل مرحلة (واجهة داخلية).
// EN: Mutation options for funding a milestone (authenticated).
export function fundMilestoneMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<PaymentDetailsResponse, Error, FundMilestoneInput> {
  return {
    mutationFn: (input: FundMilestoneInput) => fundMilestone(input),
    onSuccess: async (result) => {
      await invalidatePaymentRelatedCaches(
        queryClient,
        result.data.agreementId,
        result.data.id,
      );
    },
  };
}

// AR: خيارات طفرة إصدار دفعة (واجهة داخلية).
// EN: Mutation options for releasing a payment (authenticated).
export function releasePaymentMutationOptions(
  queryClient: QueryClient,
): UseMutationOptions<PaymentDetailsResponse, Error, ReleasePaymentInput> {
  return {
    mutationFn: (input: ReleasePaymentInput) => releasePayment(input),
    onSuccess: async (result) => {
      await invalidatePaymentRelatedCaches(
        queryClient,
        result.data.agreementId,
        result.data.id,
      );
    },
  };
}

// AR: خيارات طفرة تمويل دفعة من البوابة.
// EN: Mutation options for funding a payment from the portal.
export function portalFundPaymentMutationOptions(
  queryClient: QueryClient,
  token: string,
  paymentId: string,
): UseMutationOptions<PaymentDetailsResponse, Error, PortalFundPaymentInput> {
  return {
    mutationFn: (input: PortalFundPaymentInput) =>
      fundPaymentFromPortal(token, paymentId, input),
    onSuccess: async (result) => {
      await invalidatePortalPaymentCaches(
        queryClient,
        token,
        result.data.id,
      );
    },
  };
}

// AR: خيارات طفرة تأكيد إصدار دفعة من البوابة.
// EN: Mutation options for confirming payment release from the portal.
export function portalReleasePaymentMutationOptions(
  queryClient: QueryClient,
  token: string,
  paymentId: string,
): UseMutationOptions<PaymentDetailsResponse, Error, PortalReleaseConfirmationInput> {
  return {
    mutationFn: (input: PortalReleaseConfirmationInput) =>
      confirmReleaseFromPortal(token, paymentId, input),
    onSuccess: async (result) => {
      await invalidatePortalPaymentCaches(
        queryClient,
        token,
        result.data.id,
      );
    },
  };
}
