import { queryOptions } from "@tanstack/react-query";

<<<<<<< HEAD
import type { DeliveryFilters } from "@/types";

import { getDeliveries, getDeliveryById } from "./deliveries.api";
import { deliveriesQueryKeys } from "./deliveries.keys";

// AR: تبني query options لقائمة التسليمات مع key ثابت يعتمد على الفلاتر.
// EN: Builds deliveries-list query options with a stable key derived from filters.
export function deliveriesListQueryOptions(filters?: DeliveryFilters) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.list(filters),
    queryFn: () => getDeliveries(filters),
  });
}

// AR: تبني query options لتفاصيل تسليم واحد وتتعامل مع غياب المعرف.
// EN: Builds delivery-details query options and safely handles a missing ID.
=======
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
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
export function deliveryDetailsQueryOptions(deliveryId: string) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.detail(deliveryId),
    queryFn: () => getDeliveryById(deliveryId),
<<<<<<< HEAD
    enabled: Boolean(deliveryId),
  });
}
=======
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
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
