import { queryOptions } from "@tanstack/react-query";

import type { DeliveryFilters, DeliveryListParams } from "@/types";

import {
  getDeliveries,
  getDeliveryById,
  getPortalDeliveryById,
  getPortalWorkspace,
} from "./deliveries.api";
import { deliveriesQueryKeys } from "./deliveries.keys";

type DeliveriesQueryParams = DeliveryFilters | DeliveryListParams | undefined;

// AR: تبني query options لقائمة التسليمات مع key ثابت يعتمد على الفلاتر.
// EN: Builds deliveries-list query options with a stable key derived from filters.
export function deliveriesListQueryOptions(params?: DeliveriesQueryParams) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.list(params),
    queryFn: () => getDeliveries(params as DeliveryFilters | undefined),
  });
}

// AR: تبني خيارات استعلام تفاصيل تسليم واحد.
// EN: Builds query options for one delivery detail.
export function deliveryDetailsQueryOptions(deliveryId: string) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.detail(deliveryId),
    queryFn: () => getDeliveryById(deliveryId),
  });
}

// AR: تبني خيارات استعلام مساحة عمل بوابة العميل.
// EN: Builds query options for the client portal workspace.
export function portalWorkspaceQueryOptions(token: string) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.portalWorkspace(token),
    queryFn: () => getPortalWorkspace(token),
  });
}

// AR: تبني خيارات استعلام تفاصيل التسليم في بوابة العميل.
// EN: Builds query options for a portal-scoped delivery detail.
export function portalDeliveryDetailsQueryOptions(
  token: string,
  deliveryId: string,
) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.portalDetail(token, deliveryId),
    queryFn: () => getPortalDeliveryById(token, deliveryId),
  });
}
