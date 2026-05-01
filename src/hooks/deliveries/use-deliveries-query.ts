"use client";

import { useQuery } from "@tanstack/react-query";

import { deliveriesListQueryOptions, deliveryDetailsQueryOptions } from "@/lib/deliveries/actions";
import type { DeliveryFilters } from "@/types";

// AR: hook تغلف query الخاصة بقائمة التسليمات مع دعم الفلاتر والصفحات.
// EN: Hook wrapping the deliveries-list query with filter and pagination support.
export function useDeliveriesQuery(filters?: DeliveryFilters) {
  return useQuery(deliveriesListQueryOptions(filters));
}