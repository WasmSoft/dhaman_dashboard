"use client";

import { useQuery } from "@tanstack/react-query";

import { deliveriesListQueryOptions } from "@/lib/deliveries/actions";
import type { DeliveryFilters, DeliveryListParams } from "@/types";

// AR: hook تغلف query الخاصة بقائمة التسليمات مع دعم الفلاتر والصفحات.
// EN: Hook wrapping the deliveries-list query with filter and pagination support.
export function useDeliveriesQuery(filters?: DeliveryFilters | DeliveryListParams) {
  return useQuery({
    ...deliveriesListQueryOptions(filters),
    staleTime: 30_000,
    retry: 1,
  });
}
