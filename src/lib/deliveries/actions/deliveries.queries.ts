import { queryOptions } from "@tanstack/react-query";

import type { DeliveryListParams } from "@/types";

import {
  getDeliveries,
  getDeliveryById,
  getPortalDeliveryById,
  getPortalWorkspace,
} from "./deliveries.api";
import { deliveriesQueryKeys } from "./deliveries.keys";

// AR: تبني هذه الدالة خيارات استعلام قائمة التسليمات.
// EN: This function builds query options for the deliveries list.
export function deliveriesListQueryOptions(params?: DeliveryListParams) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.list(params),
    queryFn: () => getDeliveries(params),
  });
}

// AR: تبني هذه الدالة خيارات استعلام تفاصيل تسليم واحد.
// EN: This function builds query options for one delivery detail.
export function deliveryDetailsQueryOptions(deliveryId: string) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.detail(deliveryId),
    queryFn: () => getDeliveryById(deliveryId),
  });
}

// AR: تبني هذه الدالة خيارات استعلام مساحة عمل بوابة العميل.
// EN: This function builds query options for the client portal workspace.
export function portalWorkspaceQueryOptions(token: string) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.portalWorkspace(token),
    queryFn: () => getPortalWorkspace(token),
  });
}

// AR: تبني هذه الدالة خيارات استعلام تفاصيل التسليم في بوابة العميل.
// EN: This function builds query options for a portal-scoped delivery detail.
export function portalDeliveryDetailsQueryOptions(
  token: string,
  deliveryId: string,
) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.portalDetail(token, deliveryId),
    queryFn: () => getPortalDeliveryById(token, deliveryId),
  });
}
