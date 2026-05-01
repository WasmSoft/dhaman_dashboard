import type { QueryClient } from "@tanstack/react-query";

import type {
  PortalActionResponse,
  PortalPayment,
  PortalRejectAgreementPayload,
  PortalRequestChangesPayload,
} from "@/types";

import {
  acceptDelivery,
  approveAgreement,
  fundPayment,
  rejectAgreement,
  releasePayment,
  requestAgreementChanges,
  requestDeliveryChanges,
} from "./client-portal.api";
import { clientPortalQueryKeys, portalQueryKeys } from "./client-portal.keys";

// AR: هذه الدالة تبني أدوات invalidate لبوابة العميل بدون ربطها بأي React hook.
// EN: This function builds client-portal invalidation helpers without coupling them to any React hook.
export function createClientPortalInvalidationActions(queryClient: QueryClient) {
  return {
    invalidateOverview: () =>
      queryClient.invalidateQueries({
        queryKey: clientPortalQueryKeys.overview(),
      }),
    invalidateAgreements: () =>
      queryClient.invalidateQueries({
        queryKey: clientPortalQueryKeys.all,
      }),
  };
}

export function approveAgreementMutationOptions(
  queryClient: QueryClient,
  token: string,
) {
  return {
    mutationFn: () => approveAgreement(token),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.invite(token) }),
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.workspace(token) }),
      ]);
    },
  } satisfies {
    mutationFn: () => Promise<PortalActionResponse>;
    onSuccess: () => Promise<void>;
  };
}

export function requestAgreementChangesMutationOptions(
  queryClient: QueryClient,
  token: string,
) {
  return {
    mutationFn: (payload: PortalRequestChangesPayload) =>
      requestAgreementChanges(token, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.invite(token) }),
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.workspace(token) }),
      ]);
    },
  };
}

export function rejectAgreementMutationOptions(
  queryClient: QueryClient,
  token: string,
) {
  return {
    mutationFn: (payload: PortalRejectAgreementPayload) =>
      rejectAgreement(token, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.invite(token) }),
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.workspace(token) }),
      ]);
    },
  };
}

export function acceptDeliveryMutationOptions(
  queryClient: QueryClient,
  token: string,
  deliveryId: string,
) {
  return {
    mutationFn: () => acceptDelivery(token, deliveryId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: portalQueryKeys.delivery(token, deliveryId),
        }),
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.workspace(token) }),
      ]);
    },
  };
}

export function requestDeliveryChangesMutationOptions(
  queryClient: QueryClient,
  token: string,
  deliveryId: string,
) {
  return {
    mutationFn: (payload: PortalRequestChangesPayload) =>
      requestDeliveryChanges(token, deliveryId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: portalQueryKeys.delivery(token, deliveryId),
        }),
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.workspace(token) }),
      ]);
    },
  };
}

export function fundPaymentMutationOptions(
  queryClient: QueryClient,
  token: string,
) {
  return {
    mutationFn: (paymentId: string) => fundPayment(token, paymentId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.payments(token) }),
        queryClient.invalidateQueries({
          queryKey: portalQueryKeys.paymentHistory(token),
        }),
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.workspace(token) }),
      ]);
    },
  } satisfies {
    mutationFn: (paymentId: string) => Promise<PortalPayment>;
    onSuccess: () => Promise<void>;
  };
}

export function releasePaymentMutationOptions(
  queryClient: QueryClient,
  token: string,
) {
  return {
    mutationFn: (paymentId: string) => releasePayment(token, paymentId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.payments(token) }),
        queryClient.invalidateQueries({
          queryKey: portalQueryKeys.paymentHistory(token),
        }),
        queryClient.invalidateQueries({ queryKey: portalQueryKeys.workspace(token) }),
      ]);
    },
  } satisfies {
    mutationFn: (paymentId: string) => Promise<PortalPayment>;
    onSuccess: () => Promise<void>;
  };
}
