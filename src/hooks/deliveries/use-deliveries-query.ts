"use client";

import { useQuery } from "@tanstack/react-query";

<<<<<<< HEAD
import { deliveriesListQueryOptions, deliveryDetailsQueryOptions } from "@/lib/deliveries/actions";
import type { DeliveryFilters } from "@/types";

// AR: hook تغلف query الخاصة بقائمة التسليمات مع دعم الفلاتر والصفحات.
// EN: Hook wrapping the deliveries-list query with filter and pagination support.
export function useDeliveriesQuery(filters?: DeliveryFilters) {
  return useQuery(deliveriesListQueryOptions(filters));
}
=======
import type { DeliveryListParams } from "@/types";
import {
  deliveriesListQueryOptions,
  deliveriesQueryKeys,
  getDeliveries,
} from "@/lib/deliveries/actions";

// AR: هوك قائمة التسليمات الخاصة بالمستقل الحالي.
// EN: Query hook for the current freelancer delivery list.
export function useDeliveriesQuery(params?: DeliveryListParams) {
  return useQuery({
    ...(params
      ? deliveriesListQueryOptions(params)
      : {
          queryKey: deliveriesQueryKeys.list({}),
          queryFn: () => getDeliveries(),
        }),
    staleTime: 30_000,
    retry: 1,
  });
}
>>>>>>> 376aec6939d214e5014cc9fa065f5e9a54ce38a7
