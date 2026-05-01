"use client";

import { useQuery } from "@tanstack/react-query";

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
