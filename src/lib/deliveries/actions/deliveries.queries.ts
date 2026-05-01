import { queryOptions } from "@tanstack/react-query";

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
export function deliveryDetailsQueryOptions(deliveryId: string) {
  return queryOptions({
    queryKey: deliveriesQueryKeys.detail(deliveryId),
    queryFn: () => getDeliveryById(deliveryId),
    enabled: Boolean(deliveryId),
  });
}