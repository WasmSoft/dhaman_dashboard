import { queryOptions } from "@tanstack/react-query";

import type { ClientPortalAgreementsParams } from "@/types";

import {
  getClientPortalAgreements,
  getClientPortalOverview,
} from "./client-portal.api";
import { clientPortalQueryKeys } from "./client-portal.keys";

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
