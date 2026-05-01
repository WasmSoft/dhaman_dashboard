import { queryOptions } from "@tanstack/react-query";

import type { ClientPortalAgreementsParams } from "@/types";

import {
  getPortalDelivery,
  getPortalInvite,
  getPortalPaymentHistory,
  getPortalPayments,
  getPortalTimeline,
  getPortalWorkspace,
  getClientPortalAgreements,
  getClientPortalOverview,
} from "./client-portal.api";
import { clientPortalQueryKeys, portalQueryKeys } from "./client-portal.keys";

// AR: تبني query options الخاصة بملخص بوابة العميل لتستخدم في hooks أو prefetching.
// EN: Builds the client-portal overview query options for hooks or prefetching flows.
export function clientPortalOverviewQueryOptions() {
  return queryOptions({
    queryKey: clientPortalQueryKeys.overview(),
    queryFn: getClientPortalOverview,
  });
}

// AR: تبني query options لقائمة اتفاقيات العميل مع الحفاظ على params داخل key بشكل متسق.
// EN: Builds query options for client agreements while keeping params consistently represented in the key.
export function clientPortalAgreementsQueryOptions(
  params?: ClientPortalAgreementsParams,
) {
  return queryOptions({
    queryKey: clientPortalQueryKeys.agreements(params),
    queryFn: () => getClientPortalAgreements(params),
  });
}

export function portalInviteQueryOptions(token: string) {
  return queryOptions({
    queryKey: portalQueryKeys.invite(token),
    queryFn: () => getPortalInvite(token),
  });
}

export function portalWorkspaceQueryOptions(token: string) {
  return queryOptions({
    queryKey: portalQueryKeys.workspace(token),
    queryFn: () => getPortalWorkspace(token),
  });
}

export function portalDeliveryQueryOptions(token: string, deliveryId: string) {
  return queryOptions({
    queryKey: portalQueryKeys.delivery(token, deliveryId),
    queryFn: () => getPortalDelivery(token, deliveryId),
  });
}

export function portalPaymentsQueryOptions(token: string) {
  return queryOptions({
    queryKey: portalQueryKeys.payments(token),
    queryFn: () => getPortalPayments(token),
  });
}

export function portalPaymentHistoryQueryOptions(token: string) {
  return queryOptions({
    queryKey: portalQueryKeys.paymentHistory(token),
    queryFn: () => getPortalPaymentHistory(token),
  });
}

export function portalTimelineQueryOptions(token: string) {
  return queryOptions({
    queryKey: portalQueryKeys.timeline(token),
    queryFn: () => getPortalTimeline(token),
  });
}
